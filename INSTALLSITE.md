# API Docs site

Install instructions for the development build site. This is probablly broken and should'nt be used but for reference

## Build steps

install Ubuntu install/update/hostname/firewall/sshLockdown

#### Apache2
Install apache 2 to serve the static files from slate

```bash
sudo apt install apache2
```

##### apache config

```
sudo nano /etc/apache2/apache2.conf
```

> add the `ServerName` to the fiile

**serving the default site at /var/www/html to \*:80**

We also serve up the jekyll site at 127.0.0.1:4000 which we proxy through apache to localhost:4000 to reach the jekyll site through apache. Makes it much better than opening ports on the server.


I have added the following to the default config to allow the proxy to port 4000
/etc/apache2/sites-available/test.fr1t2.conf
```
        ServerName www.test.fr1t2.com
        ServerAlias test.fr1t2.com
        ServerAdmin fr1t2@fr1t2.com


        #DocumentRoot /var/www/html

        ProxyPreserveHost On
        ProxyRequests Off
        ProxyPass / http://localhost:4000/
        ProxyPassReverse / http://localhost:4000/
```



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

##### Basic useage
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
```

```bash
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
```

```bash
sudo apt-get update
```

```bash
apt-cache policy docker-ce
```

```bash
sudo apt-get install -y docker-ce
```

```bash
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


### Slate Docs 

from https://github.com/fr1t2/slate

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


## Scripting

Created scripts for api

##### api.sh

```bash
#!/bin/bash
#
#------ github updates --------

## update slate docs from my repo/branch
cd ${HOME}/repo/slate
git fetch origin
## Reset the local repo removing any changes before we pull
## Change the repo to the correcct origin if needed
git reset --hard origin/QRL
git pull

## update the QRL repo
cd ${HOME}/repo/qrl
git pull

## Move the proto file to our working directory
rsync -azPv ${HOME}/repo/qrl/src/qrl/protos/qrl.proto ${HOME}/manualAPI/examples/proto/


## Generate the docs from the .proto files using protoc-gen-doc
docker run --rm -v ${HOME}/manualAPI/examples/doc:/out -v ${HOME}/manualAPI/examples/proto/:/protos   pseudomuto/protoc-gen-doc --doc_opt=markdown,docs.md

docker run --rm -v ${HOME}/manualAPI/examples/doc:/out -v ${HOME}/manualAPI/examples/proto/:/protos   pseudomuto/protoc-gen-doc --doc_opt=json,docs.json

docker run --rm -v ${HOME}/manualAPI/examples/doc:/out -v ${HOME}/manualAPI/examples/proto/:/protos   pseudomuto/protoc-gen-doc --doc_opt=html,docs.html

docker run --rm -v ${HOME}/manualAPI/examples/doc:/out -v ${HOME}/manualAPI/examples/proto/:/protos   pseudomuto/protoc-gen-doc --doc_opt=docbook,docs.xml



### Pull out any ### to <a name in the docs.md file and strip the <a name> tag

#sed -n '/###/,/a name/p' ${HOME}/manualAPI/examples/doc/docs.md > ${HOME}/manualAPI/examples/doc/out.txt

# change "### to ##" and "## to #"
sed -i -e 's/##/#/g' ${HOME}/manualAPI/examples/doc/docs.md


# strip everything before # qrl.proto
sed '/# qrl.proto/,$!d' ${HOME}/manualAPI/examples/doc/docs.md > ${HOME}/manualAPI/examples/doc/out1.txt 

# Add blank line to beginning of file
sed -s -i '1i\\' ${HOME}/manualAPI/examples/doc/out1.txt

grep -vE "(<a name|# Table|<p|# Prot)" ${HOME}/manualAPI/examples/doc/out1.txt > ${HOME}/manualAPI/examples/doc/out2.txt

## converg front matter and API docs file
cat ${HOME}/repo/slate/front.txt ${HOME}/manualAPI/examples/doc/out2.txt > ${HOME}/manualAPI/examples/doc/QRL_index.html.md

cd ${HOME}/repo/slate
#git pull

### copy the index.html.md file we created into the root buld dir for slate
cp ${HOME}/manualAPI/examples/doc/QRL_index.html.md ${HOME}/repo/slate/QRL/

## Push the docs to the slate directory
cd ${HOME}/repo/slate
git add .
git commit -m "AutoUpdating QRL_index.html.md, see the changes in the /QRL/QRL_index.html.md file"
git push

## Build the site
#cd ${HOME}/repo/slate
#bundle install
## Bundle the slate site up into static files
#bundle exec middleman build --clean 

#cp -r ${HOME}/repo/slate/build/* ${HOME}/site

## Move the site into the webroot and assign permissions
## Se webRootMove.sh

```




##### webRootmv.sh

because of apache permissions this will need to be moved by root.

set a root cron job

```bash
sudo crontab -e
```

Add this line to the file
```bash
*/5 * * * * /home/ubuntu/script/webRootmv.sh
```

```bash
#!/bin/bash

cp ${HOME}/work/examples/doc/* /var/www/html/


```



## Choping the docs up








## Notes

### Slate Docs

use includes in the front matter will add the list to the end of the index.html adding each to the docs. 

File name must start with an underscore "\_" in the includes directory...



could break into small parts and manage here somehow...





## Install jekyll

install ruby, gem, gcc g++ make



