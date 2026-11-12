# QRL API documentation

Source for the QRL protocol and API documentation published at [api.theqrl.org](https://api.theqrl.org). The site uses [Slate](https://github.com/slatedocs/slate), [Middleman](https://middlemanapp.com/), and Markdown to generate a static website.

## Requirements

- Linux or macOS
- Ruby 3.3 (the exact version is recorded in [.ruby-version](.ruby-version))
- Bundler 2.x
- Node.js, available on `PATH`, for JavaScript compilation and CSS autoprefixing
- A C/C++ compiler and build tools for gems with native extensions (Xcode Command Line Tools on macOS; a compiler toolchain and Ruby development headers on Linux)

Use a Ruby version manager to install the version in `.ruby-version`; the system Ruby supplied with macOS is too old. Install Bundler if needed:

```sh
gem install bundler -v '~> 2.6'
```

## Run locally

```sh
git clone https://github.com/theQRL/api.theqrl.org.git
cd api.theqrl.org
bundle install
bundle exec middleman server
```

Open [localhost:4567](http://localhost:4567). Middleman watches the source files and rebuilds as you edit them. Stop the server with Ctrl+C.

## Edit the documentation

- [source/index.html.md](source/index.html.md) contains the introduction and front matter, including the language tabs and ordered list of included sections.
- [source/includes/](source/includes/) contains the API and protocol sections. The `.proto.md` files are Markdown documentation; update them when the corresponding QRL protocol changes.
- [source/layouts/layout.erb](source/layouts/layout.erb) defines the page layout and navigation.
- [source/stylesheets/](source/stylesheets/) and [source/javascripts/](source/javascripts/) contain the site assets.
- [config.rb](config.rb) configures Markdown rendering, syntax highlighting, assets, and build minification.
- [lib/](lib/) contains custom heading, table of contents, and language-tab helpers.

Use fenced code blocks with a language matching a tab configured in the page front matter, such as `python`, `javascript`, or `shell`. Code examples appear in the panel on the right. Blockquotes (`>`) add notes to that panel. Use `<aside class="success">`, `<aside class="notice">`, or `<aside class="alert">` for callouts in the main text.

See the [Slate Markdown guide](https://github.com/slatedocs/slate/wiki/Markdown-Syntax) for more formatting examples.

## Build and publish

```sh
bundle exec middleman build --clean
```

The build generates the complete static site in `build/`, which is ignored by Git. Check that the command succeeds and review the rendered documentation before publishing. Deploy the **contents** of `build/` to the web server's document root; Ruby and Node.js are needed only to build the site.

The same build command is available in [_scripts/build.sh](_scripts/build.sh).

## Update dependencies

The Gemfile specifies compatible dependency ranges, and `Gemfile.lock` records the resolved versions. After changing dependencies, run:

```sh
bundle update
bundle exec middleman build --clean
```

Commit both `Gemfile` and `Gemfile.lock` when changing dependency requirements. Keep `.ruby-version` and the Ruby requirement in `Gemfile` aligned. ExecJS uses Node.js; the legacy `therubyracer` gem is no longer required.

[INSTALLSITE.md](INSTALLSITE.md) and [Vagrantfile](Vagrantfile) are historical deployment references that target older Ruby and operating system versions. Use the setup above for the current dependency stack.

## Project

- [QRL blockchain and API](https://github.com/theQRL/QRL)
- [Contributors](https://github.com/theQRL/api.theqrl.org/graphs/contributors)
- Original site layout and development: [James Gordon (fr1t2)](https://github.com/fr1t2)
- [License](LICENSE)
