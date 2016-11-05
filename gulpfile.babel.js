import gulp from "gulp";
import secrets from "node-env-file";
import { readFileSync } from "fs";

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
import sourcemaps from "gulp-sourcemaps";
import SSHClient from "gulp-ssh";
import sync from "gulp-sync";
import tar from "gulp-tar";

const gulpsync = sync(gulp);
const gulpssh = new SSHClient({
  ignoreErrors: false,
  sshConfig: {
    host: process.env.DEPLOY_HOST,
    username: "daniel",
    privateKey: readFileSync(
      process.env.DEPLOY_SSH_KEY_PATH
    ),
    password: process.env.DEPLOY_SSH_KEY_PASSWORD,
    passphrase: process.env.DEPLOY_SSH_KEY_PASSWORD
  }
});

const DESTINATION = "build";
const CACHE = "_CACHE";
const ICONFONT_NAME = "daniellacosse-icons";

gulp.task("default", gulpsync.sync([
  "cleanup",
  [
    "build-client",
    "build-server",
  ], [
    "watch-files",
    "init-server"
  ]
]));

gulp.task("rebuild-server", gulpsync.sync([
  "cleanup",
  "build-server",
  "init-server"
]));

gulp.task("deploy", gulpsync.sync([
  "cleanup",
  [
    "build-production-client",
    "build-production-server", [
      "compress-and-deploy"
    ]
  ],
]));

gulp.task("build-client", gulpsync.sync([
  "generate-iconfont",
  [
    "application-scripts",
    "concat-application-framework",
    "application-css",
    "application-html",
    "copy-assets",
    "copy-config"
  ]
]));

gulp.task("rebuild-client", gulpsync.sync([
  "cleanup",
  "build-client",
  "init-server"
]));

gulp.task("build-production-client", gulpsync.sync([
  "generate-iconfont",
  [
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
});

gulp.task("watch-files", () => {
  gulp.watch([
    get("helpers/**/*.js"),
    get("routes/**/*.js")
  ], ["rebuild-server"]);
  gulp.watch([
    get("client/**/*.js"),
    get("assets/**/*")
  ], ["rebuild-client"]);
});

gulp.task("cleanup", () => {
  return gulp.src([DESTINATION, CACHE], { read: false })
    .pipe(
      clean()
    );
});

gulp.task("compress-and-deploy", () => {
  const deploymentHash = Math.floor(Math.random() * 100000000)
    .toString(16);
  const deploymentID =
    `${new Date().toLocaleDateString().replace(/\//g, "-")}-${deploymentHash}`;

  return gulp.src([`${DESTINATION}/**/*`, `${DESTINATION}/.secrets`])
    .pipe(
      tar(`${deploymentID}.tar`)
    )
    .pipe(
      gzip()
    )
    .pipe(
      gulpssh.sftp("write",
        `/home/daniel/builds/${deploymentID}.tar.gz`)
    )
    .pipe(
      gulpssh.shell([
        "pkill -f node",
        "rm -rf app",
        "mkdir app",
        `cp builds/${deploymentID}.tar.gz app`,
        "cd app",
        `tar -xvzf ${deploymentID}.tar.gz`,
        `rm ${deploymentID}.tar.gz`,
        "npm install",
        "sudo PORT=80 node server.js"
      ])
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
          sourcemaps: true
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
          minify: true,
          sourcemaps: false
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
    .pipe(
      plumber(handle_error)
    )
    .pipe(
      sourcemaps.init()
    )
    .pipe(
      concat("_framework_.js")
    )
    .pipe(
      babel({
        presets: ["stage-0", "es2015"]
      })
    )
    .pipe(
      sourcemaps.write()
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
      plumber(handle_error)
    )
    .pipe(
      sourcemaps.init()
    )
    .pipe(
      babel({
        presets: ["stage-0", "es2015"]
      })
    )
    .pipe(
      sourcemaps.write()
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
  return gulp.src([
    ".secrets", "package.json"
  ])
    .pipe(gulp.dest(DESTINATION));
});

///\\\///\\\ HELPERS ///\\\///\\\
function packer_settings({ minify, sourcemaps }) {
  return {
    target: "node",
    devtool: sourcemaps ? "source-map" : "",
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
    }
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
