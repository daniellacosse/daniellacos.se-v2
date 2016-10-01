import gulp from "gulp";
import webpack from "webpack";

import babel       from "gulp-babel";
import clean       from "gulp-clean";
import concat      from "gulp-concat";
import gzip        from "gulp-gzip";
import iconfont    from "gulp-iconfont";
import minify_css  from "gulp-minify-css";
import minify_html from "gulp-minify-html";
import notify      from "gulp-notify";
import open        from "gulp-open";
import packer      from "webpack-stream";
import plumber     from "gulp-plumber";
import server      from "gulp-live-server";
import sync        from "gulp-sync";
import tar         from "gulp-tar";

const gulpsync = sync(gulp);
const DESTINATION = ".dist";

gulp.task("default", gulpsync.sync([
  "cleanup",
  "build-client",
  "build-server",
  "watch-files",
  "init-server",
  "launch-browser"
]));

gulp.task("production", gulpsync.sync([
  "cleanup",
  [
    "build-production-client",
    "build-production-server"
  ],
  [
    "compress-dist"
  ]
]));

gulp.task("build-client", [
  "application-scripts",
  "concat-application-script-essentials",
  "application-css",
  "application-html",
  "generate-iconfont",
  "copy-assets",
  "copy-config"
]);

gulp.task("build-production-client", [
  "application-production-scripts",
  "concat-application-production-script-essentials",
  "application-production-css",
  "application-production-html",
  "generate-iconfont",
  "copy-assets",
  "copy-config"
]);

gulp.task("watch-files", () => {
  gulp.watch(get("helpers/**/*.js"), ["build-server"]);
  gulp.watch(get("routes/**/*.js"), ["build-server"]);
  gulp.watch(get("client/**/*.js"), ["build-client"]);
  gulp.watch(get("assets/**/*"), ["build-client"]);
});

gulp.task("cleanup", () => {
  return gulp.src(DESTINATION, { read: false }).pipe( clean() );
});

gulp.task("compress-dist", () => {
  return gulp.src(`${DESTINATION}/**/*`)
    .pipe(
      tar(".dist.tar")
    )
    .pipe(gzip())
    .pipe( // TODO: send to god
      gulp.dest(".")
    )
});

gulp.task("build-server", () => {
  return gulp.src(get("server.js"))
    .pipe(
      plumber(handle_error)
    )
    .pipe(
      packer(
        packer_settings({ minify: false })
      )
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
        packer_settings({ minify: true })
      )
    )
    .pipe(
      gulp.dest(DESTINATION)
    );
});

///\\\///\\\ ASSET TASKS ///\\\///\\\
gulp.task("application-html", () => {
  return gulp.src(get_asset("index.html"))
    .pipe(
      plumber(handle_error)
    )
    .pipe(
      gulp.dest(`${DESTINATION}/assets`)
    );
});

gulp.task("application-css", () => {
  return gulp.src(get_asset("index.css"))
    .pipe(
      plumber(handle_error)
    )
    .pipe(
      gulp.dest(`${DESTINATION}/assets`)
    );
});

gulp.task("concat-application-script-essentials", () => {
  return gulp.src(get_client("libraries/essentials/*.js"))
    .pipe(concat("_essentials_.js"))
    .pipe(
      babel({
        presets: [ "stage-0", "es2015" ]
      })
    )
    .pipe(
      plumber(handle_error)
    )
    .pipe(
      gulp.dest(`${DESTINATION}/client/libraries`)
    );
});

gulp.task("application-scripts", () => {
  return gulp.src([
          get_client("**/*.js"),
      `!${get_client("libraries/essentials/*.js")}`
    ]).pipe(
      babel({
        presets: [ "stage-0", "es2015" ]
      })
    )
    .pipe(
      plumber(handle_error)
    )
    .pipe(
      gulp.dest(`${DESTINATION}/client`)
    );
});

gulp.task("application-production-html", () => {
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

gulp.task("application-production-css", () => {
  return minify_css(
      get_asset("index.css")
    )
    .pipe(
      plumber(handle_error)
    )
    .pipe(
      gulp.dest(`${DESTINATION}/assets`)
    );
});

gulp.task("application-production-scripts", () => {
  return gulp.src([
          get_client("**/*.js"),
      `!${get_client("libraries/essentials/*.js")}`
    ]).pipe(
      babel({
        presets: [ "stage-0", "es2015", "babili" ]
      })
    )
    .pipe(
      plumber(handle_error)
    )
    .pipe(
      gulp.dest(`${DESTINATION}/client`)
    );
});

gulp.task("concat-application-production-script-essentials", () => {
  return gulp.src(get_client("libraries/essentials/*.js"))
    .pipe(
      concat("_essentials_.js")
    )
    .pipe(
      babel({
        presets: [ "stage-0", "es2015", "babili" ]
      })
    )
    .pipe(
      plumber(handle_error)
    )
    .pipe(
      gulp.dest(`${DESTINATION}/client/libraries`)
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
      gulp.dest(`${DESTINATION}/assets`)
    );
});

gulp.task("copy-assets", () => {
  return gulp.src([
    get_asset("*.jpg"),
    get_asset("*.ico"),
    get_asset("fonts/**/*.woff")
  ]).pipe( gulp.dest(`${DESTINATION}/assets`) );
});

gulp.task("copy-config", () => {
  return gulp.src([ ".secrets", "package.json" ]).pipe( gulp.dest(DESTINATION) );
});

///\\\///\\\ SERVE AND LAUNCH ///\\\///\\\
gulp.task("init-server", () => {
  let LIVE_SERVER;

  const constructServer = () => {
    if (LIVE_SERVER) LIVE_SERVER.stop()

    LIVE_SERVER = server("./server.js", { cwd: `${__dirname}/${DESTINATION}` });
    return LIVE_SERVER.start();
  }

  return constructServer().then(() => {
    return gulp.watch(`${DESTINATION}/server.js`, constructServer)
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
function packer_settings({ minify }) {
  let plugins = [];

  if (minify) {
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
    output: {
      filename: "server.js"
    },
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
            presets: minify
              ? ["es2015", "stage-0", "babili"]
              : ["es2015", "stage-0"]
          }
        }, {
          test:  /\.json$/,
          loader: "json-loader"
        }
      ]
    },
    plugins
  };
}

function get(filepath) {
  return `./${filepath}`;
}

function get_asset(filepath) {
  return get(`assets/${filepath}`);
}

function get_client(filepath) {
  return get(`client/${filepath}`);
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
