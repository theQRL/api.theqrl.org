# API Docs site

Install instructions for the development build site. This is probably broken and shouldn't be used but for reference

## Build steps

install Ubuntu install/update/hostname/firewall/sshLockdown


#### Jekyll

Install jekyll and related dependencies

```bash
# install
sudo apt-get install ruby ruby-dev build-essential

echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME=$HOME/gems' >> ~/.bashrc
echo 'export PATH=$HOME/gems/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
gem install jekyll bundler

# update jekyll
jekyll --version
gem list jekyll
bundle update jekyll
```

##### Basic Usage

```
jekyll build
# => The current folder will be generated into ./_site

jekyll build --destination <destination>
# => The current folder will be generated into <destination>

jekyll build --source <source> --destination <destination>
# => The <source> folder will be generated into <destination>

jekyll build --watch
# => The current folder will be generated into ./_site,
#    watched for changes, and regenerated automatically.


# I am running on the docs.theqrl.org site from a screen session in the ~/docs/docs.theqrl.org dir
bundle exec jekyll serve -w -I
```


#### Docker

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

sudo apt-get update

apt-cache policy docker-ce

sudo apt-get install -y docker-ce

sudo systemctl status docker
```

Add user to docker group to avoid sudo. Logout or switch users to go into effect.

```bash
sudo usermod -aG docker ${USER}

su - ${USER}
```

#### Docs Generator

Using this to generate the docs from a .proto file into .md, .json, .html, .xml

https://github.com/pseudomuto/protoc-gen-doc

Grab the docker container with:

```bash
docker pull pseudomuto/protoc-gen-doc
```

```
#generate the docs like this
docker run --rm -v ${HOME}/work/examples/doc:/out -v ${HOME}/work/examples/proto/:/protos   pseudomuto/protoc-gen-doc --doc_opt=markdown,docs.md
```

#### Create directory structure

directories in home dir:
`mkdir ~/repo ~/work ~/script ~/site`

#### clone qrl
`git clone https://github.com/theqrl/qrl.git`


### Slate

#### needed:

##### Ruby 2.3.1 or newer
```bash
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
```

grab the RVM script

```bash
\curl -sSL https://get.rvm.io -o rvm.sh
```

install

```bash
cat rvm.sh | bash -s stable
```

source it
```bash
source ~/.rvm/scripts/rvm
```

```bash
rvm install ruby --default
```


##### Bundler
 `gem install bundler`


##### bundle slate

```bash
bundle install
```

```bash
bundle exec middleman build --clean
```

move the build dir to webroot and enjoy



