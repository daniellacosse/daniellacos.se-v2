import gulp from "gulp";
import webpack from "webpack";

import babel       from "gulp-babel";
import clean       from "gulp-clean";
import concat      from "gulp-concat";
import connect     from "gulp-connect";
import gzip        from "gulp-gzip";
import iconfont    from "gulp-iconfont";
import minify_css  from "gulp-minify-css";
import minify_html from "gulp-minify-html";
import notify      from "gulp-notify";
import open        from "gulp-open";
import packer      from "webpack-stream";
import plumber     from "gulp-plumber";
import sync        from "gulp-sync";
import tar         from "gulp-tar";

const DESTINATION = ".dist";

gulp.task("default", sync(gulp).sync([
  "cleanup",
  [
    "build-client",
    "build-server"
  ],
  "serve", [
    "watch",
    "launch-browser"
  ]
]));

gulp.task("production", sync(gulp).sync([
  "cleanup",
  [
    "build-client",
    "build-production-server"
  ], [
    "compress-dist"
  ],
  "cleanup"
]));

gulp.task("build-client", [
  "application-scripts",
  "application-css",
  "application-html",
  "generate-iconfont",
  "copy-images",
  "copy-secrets",
  "copy-fonts",
  "copy-package-json"
]);

gulp.task("watch", () => {
  gulp.watch(get("helpers/**/*.js"), ["build-server"]);
  gulp.watch(get("routes/**/*.js"), ["build-server"]);
  gulp.watch(get("client/**/*.js"), ["build-client"]);
  gulp.watch(get("assets"), ["build-client"]);
});

gulp.task("cleanup", () => {
  return gulp.src(DESTINATION, { read: false }).pipe( clean() );
});

gulp.task("compress-dist", () => {
  return gulp.src(DESTINATION)
    .pipe(
      tar("daniellacosse.tar")
    )
    .pipe(
      gzip()
    )
    .pipe(
      gulp.dest("~/Desktop")
    )
});

gulp.task("build-server", () => {
  return gulp.src(get("server.js"))
    .pipe(
      plumber(handle_error)
    )
    .pipe(
      packer(
        packer_settings({
          minify: false,
          sourcemap: true
        })
      )
    )
    .pipe(
      connect.reload()
    )
    .pipe(
      gulp.dest(DESTINATION)
    );
});

gulp.task("build-production-server", () => {
  return gulp.src(get("server.js"))
    .pipe(
      plumber(handle_error)
    )
    .pipe(
      packer(
        packer_settings({
          minify: true
        })
      )
    )
    .pipe(
      gulp.dest(DESTINATION)
    );
});

///\\\///\\\ ASSET TASKS ///\\\///\\\
gulp.task("application-html", () => {
  return gulp.src(get("index.html"))
    .pipe(
      plumber(handle_error)
    )
    .pipe(
      minify_html()
    )
    .pipe(
      gulp.dest(`${DESTINATION}/assets`)
    );
});

gulp.task("application-css", () => {
  return minify_css(
      get_asset("index.css")
    )
    .pipe(
      plumber(handle_error)
    )
    .pipe(
      connect.reload()
    )
    .pipe(
      gulp.dest(`${DESTINATION}/assets`)
    );
});

// TODO: concat essentials
gulp.task("application-scripts", () => {
  return gulp.src(get("client/**/*.js"))
    .pipe(
      babel({
        presets: [ "stage-0", "es2015" ]
      })
    )
    .pipe(
      plumber(handle_error)
    )
    .pipe(
      connect.reload()
    )
    .pipe(
      gulp.dest(`${DESTINATION}/client`)
    );
});

gulp.task("generate-iconfont", () => {
  return gulp.src(get_asset("icons/*.svg"))
    .pipe(
      plumber(handle_error)
    )
    .pipe(
      iconfont({
        fontName: "daniellacosse-icons",
        formats: [ "woff" ]
      })
    )
    .pipe(
      gulp.dest(`${DESTINATION}/assets/fonts`)
    );
});

gulp.task("copy-fonts", () => {
  return gulp.src(get_asset("fonts/**/*.woff")).pipe( gulp.dest(`${DESTINATION}/assets/fonts`) );
});

gulp.task("copy-images", () => {
  return gulp.src(get_asset("*.jpg")).pipe( gulp.dest(`${DESTINATION}/assets`) );
});

gulp.task("copy-secrets", () => {
  return gulp.src(".secrets").pipe( gulp.dest(DESTINATION) );
});

gulp.task("copy-package-json", () => {
  return gulp.src("package.json").pipe( gulp.dest(DESTINATION) );
});

///\\\///\\\ SERVE AND LAUNCH ///\\\///\\\
gulp.task("serve", () => {
  connect.server({
    root: "dist",
    port: process.env.PORT || 9999,
    livereload: true
  });
});

gulp.task("launch-browser", () => {
  return gulp.src(__filename)
    .pipe(
      open({
        uri: "http://localhost:9999"
      })
    );
});

///\\\///\\\ HELPERS ///\\\///\\\
function packer_settings(options) {
  let plugins;

  if (options.minify) {
    plugins = [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
        output: {
          comments: false,
          semicolons: true,
        },
      }),
    ];
  }

  return {
    target: "node",
    resolve: {
      root: [ __dirname ],
      extensions : ["", ".js", ".json"]
    },
    module: {
      loaders: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          query: {
            presets: ["es2015", "stage-0"]
          }
        }, {
          test:  /\.json$/,
          loader: "json-loader"
        }
      ]
    }
  };
}

function get(filepath) {
  return `./${filepath}`;
}

function get_asset(filepath) {
  return `./assets/${filepath}`;
}

function destination(filename) {
  return (!!filename) ? `./${DESTINATION}` : `./${DESTINATION}/${filename}`;
}

function handle_error() {
  notify
    .onError({
      title: "Compiler Error",
      message: "<%= error.message %>"
    })
    .apply(this, Array.prototype.slice.call(arguments));

  this.emit("end"); // Keep gulp from hanging on this task
}
