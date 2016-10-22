import gulp from "gulp";
import webpack from "webpack";
import secrets from "node-env-file"

secrets("./.secrets");

import babel from "gulp-babel";
import clean from "gulp-clean";
import concat from "gulp-concat";
import gzip from "gulp-gzip";
import iconfont from "gulp-iconfont";
import iconfontCSS from "gulp-iconfont-css";
import minify_css from "gulp-minify-css";
import minify_html from "gulp-minify-html";
import notify from "gulp-notify";
import open from "gulp-open";
import packer from "webpack-stream";
import plumber from "gulp-plumber";
import server from "gulp-live-server";
import sync from "gulp-sync";
import tar from "gulp-tar";

const gulpsync = sync(gulp);
const DESTINATION = ".dist";
const COMPRESSED_DESTINATION = `${DESTINATION}.tar.gz`;
const CACHE = "_CACHE";
const ICONFONT_NAME = "daniellacosse-icons";

gulp.task("default", gulpsync.sync([
  "cleanup",
  "build-client",
  "build-server",
  "watch-files",
  "init-server"
]));

gulp.task("deploy", gulpsync.sync([
  "cleanup",
  "build-production-client",
  "build-production-server",
  "send-to-god"
]));

gulp.task("build-client", gulpsync.sync([
  "generate-iconfont", [
    "application-scripts",
    "concat-application-framework",
    "application-css",
    "application-html",
    "copy-assets",
    "copy-config"
  ]
]));

gulp.task("build-production-client", gulpsync.sync([
  "generate-iconfont", [
    "application-production-scripts",
    "concat-application-production-framework",
    "application-production-css",
    "application-production-html",
    "copy-assets",
    "copy-config"
  ]
]));

///\\\///\\\ SERVER TASKS ///\\\///\\\
gulp.task("init-server", () => {
  let LIVE_SERVER;

  const constructServer = () => {
    if (LIVE_SERVER) LIVE_SERVER.stop()

    LIVE_SERVER = server("./server.js", {
      cwd: `${__dirname}/${DESTINATION}`,
      env: process.env
    });
    return LIVE_SERVER.start();
  }

  return constructServer()
    .then(() => {
      return gulp.src(__filename)
        .pipe(
          open({
            uri: "http://localhost:9999"
          })
        )
        // .watch(`${DESTINATION}/**/*`, constructServer)
    });
});

gulp.task("watch-files", () => {
  gulp.watch(get("helpers/**/*.js"), ["cleanup", "build-server",
    "init-server"]);
  gulp.watch(get("routes/**/*.js"), ["cleanup", "build-server",
    "init-server"]);
  gulp.watch(get("client/**/*.js"), ["cleanup", "build-client"]);
  gulp.watch(get("assets/**/*"), ["cleanup", "build-client"]);
});

gulp.task("cleanup", () => {
  return gulp.src([
    DESTINATION,
    CACHE,
    COMPRESSED_DESTINATION
  ], {
      read: false
    })
    .pipe(
      clean()
    );
});

gulp.task("send-to-god", () => {
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
        packer_settings({
          minify: false
        })
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
        packer_settings({
          minify: true
        })
      )
    )
    .pipe(
      gulp.dest(DESTINATION)
    );
});

///\\\///\\\ CLIENT TASKS ///\\\///\\\
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
  return gulp.src(get_asset("stylesheets/*.css"))
    .pipe(
      plumber(handle_error)
    )
    .pipe(
      concat("index.css")
    )
    .pipe(
      gulp.dest(`${DESTINATION}/assets`)
    );
});

gulp.task("concat-application-framework", () => {
  return gulp.src(get_client("_framework_/*.js"))
    .pipe(concat("_framework_.js"))
    .pipe(
      babel({
        presets: ["stage-0", "es2015"]
      })
    )
    .pipe(
      plumber(handle_error)
    )
    .pipe(
      gulp.dest(`${DESTINATION}/client`)
    );
});

gulp.task("application-scripts", () => {
  return gulp.src([
          get_client("**/*.js"),
      `!${get_client("_framework_/*.js")}`
    ])
    .pipe(
      babel({
        presets: ["stage-0", "es2015"]
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
      get_asset("stylesheets/index.css")
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
      `!${get_client("_framework_/*.js")}`
    ])
    .pipe(
      babel({
        presets: ["stage-0", "es2015", "babili"]
      })
    )
    .pipe(
      plumber(handle_error)
    )
    .pipe(
      gulp.dest(`${DESTINATION}/client`)
    );
});

gulp.task("concat-application-production-framework", () => {
  return gulp.src(get_client("_framework_/*.js"))
    .pipe(
      plumber(handle_error)
    )
    .pipe(
      concat("_framework_.js")
    )
    .pipe(
      babel({
        presets: ["stage-0", "es2015", "babili"]
      })
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
      iconfontCSS({
        fontName: ICONFONT_NAME,
        targetPath: "../stylesheets/icons.css"
      })
    )
    .pipe(
      iconfont({
        fontName: ICONFONT_NAME,
        formats: ["woff"]
      })
    )
    .pipe(
      gulp.dest("assets/fonts")
    );
});

gulp.task("copy-assets", () => {
  return gulp.src([
    get_asset("images/*.jpg"),
    get_asset("images/*.ico"),
    get_asset("fonts/**/*.woff")
  ])
    .pipe(gulp.dest(`${DESTINATION}/assets`));
});

gulp.task("copy-config", () => {
  return gulp.src([".secrets", "package.json"])
    .pipe(gulp.dest(DESTINATION));
});

///\\\///\\\ HELPERS ///\\\///\\\
function packer_settings({
  minify
}) {
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
      root: [__dirname],
      extensions: ["", ".js", ".json"]
    },
    module: {
      loaders: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          query: {
            presets: minify ? ["es2015", "stage-0", "babili"] : ["es2015",
              "stage-0"]
          }
        }, {
          test: /\.json$/,
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
