# QRL API DOCUMENTATION v1.0.1

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/38c5562150254c0086b333417403bd9c)](https://app.codacy.com/app/fr1t2/api.theqrl.org?utm_source=github.com&utm_medium=referral&utm_content=fr1t2/api.theqrl.org&utm_campaign=Badge_Grade_Settings)


# Project Title

This site serves the protocol documentation for [theQRL](https://github.com/theQRL/QRL). 

## Getting Started

> This is the site hosted at [https://api.theqrl.org](https://api.theqrl.org) 


This documentation is build using the [Slate API](https://github.com/lord/slate) documentation builder. 

<p align="center">
  <img src="https://raw.githubusercontent.com/lord/img/master/logo-slate.png" alt="Slate: API Documentation Generator" width="226">
</p>

<p align="center">Slate helps you create beautiful, intelligent, responsive API documentation.</p>

<p align="center"><img src="https://raw.githubusercontent.com/lord/img/master/screenshot-slate.png" width=700 alt="Screenshot of Example Documentation created with Slate"></p>


There are some great instructions on how to edit the site over in the [Slate WIKI](https://github.com/lord/slate/wiki)

### Site Details

- The main page is built from /source/index.html.md, **Edit this File**
- Proto files are pulled in from the /source/includes/ directory. Look here for the proto files and **Edit here**
- Code blocks that show up on the right are first after the section header
- `<aside class="success"></aside>` gives a call out in the body
   - `alert` and `notice` also work and change the style.
- `>` gives a call out in the code section on the right
- Code blocks that start with \`\`\`javascript will be shown when the javascript tab is selected
- Code blocks that start with \`\`\`python will be shown when the python tab is selected
- Code blocks that start with \`\`\`shell will be shown when the cURL tab is selected


### Getting Started with Slate

------------------------------

#### Prerequisites

You're going to need:

 - **Linux or macOS** — Windows may work, but is unsupported.
 - **Ruby, version 2.3.1 or newer**
 - **Bundler** — If Ruby is already installed, but the `bundle` command doesn't work, just run `gem install bundler` in a terminal.

#### Getting Set Up

1. Fork this repository on GitHub.
2. Clone *your forked repository* (not our original one) to your hard drive with `git clone https://github.com/YOURUSERNAME/slate.git`
3. `cd slate`
4. Initialize and start Slate. You can either do this locally, or with Vagrant:

```bash
# either run this to run locally
bundle install
bundle exec middleman server

```
You can now see the docs at http://localhost:4567. Whoa! That was fast!


To build a clean static site simply. This will build into the /build directory

```bash
bundle exec middleman build --clean
```

OR run this to run with vagrant

```bash
vagrant up
```

Now that Slate is all set up on your machine, you'll probably want to learn more about [editing Slate markdown](https://github.com/lord/slate/wiki/Markdown-Syntax), or [how to publish your docs](https://github.com/lord/slate/wiki/Deploying-Slate).

If you'd prefer to use Docker, instructions are available [in the wiki](https://github.com/lord/slate/wiki/Docker).

##### Note on JavaScript Runtime

For those who don't have JavaScript runtime or are experiencing JavaScript runtime issues with ExecJS, it is recommended to add the [rubyracer gem](https://github.com/cowboyd/therubyracer) to your gemfile and run `bundle` again.



#### Ruby 2.3.1 or newer

```bash
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB

#grab the RVM script
\curl -sSL https://get.rvm.io -o rvm.sh

# install
cat rvm.sh | bash -s stable

#source it
source ~/.rvm/scripts/rvm

rvm install ruby --default
```

#### Bundler

Install bundler with the following.

```bash
gem install bundler
```


#### bundle slate


From the root directory with the latest changes made in the source files, run the following commands.

```bash
# Install
bundle install

bundle exec middleman build --clean
```

This will take any new changes in the /source direcctory and build it into the /build folder with a static directory and index.html file. Move the /build directory to your webroot to serve the file.



## Built With

* [Slate](https://github.com/lord/slate) - Slate API Documentation
* [The QRL](https://github.com/theQRL/QRL) - The QRL blockchain and API


## Authors

* **James Gordon** - *Site Layout and development* - [fr1t2]](https://github.com/fr1t2)

See also the list of [contributors](https://github.com/theqrl/api.theqrl.org/graphs/contributors) who participated in this project.


Drop in the discord if you need to ask a question [QRL Discord Server](https://discord.gg/HhYKQyD)
