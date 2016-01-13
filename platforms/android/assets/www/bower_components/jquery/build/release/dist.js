module.exports=function(i,r){function e(){i.chdir(i.dir.base),i.dir.dist=i.dir.base+"/dist",i.exec("git clone "+a+" "+i.dir.dist,"Error cloning repo."),i.chdir(i.dir.dist),i.exec("git checkout master","Error checking out branch.")}function t(){return JSON.stringify({name:c.name,main:c.main,license:"MIT",ignore:["package.json"],keywords:c.keywords},null,2)}function o(){var r=i.dir.dist+"/dist";d.mkdir("-p",r),["dist/jquery.js","dist/jquery.min.js","dist/jquery.min.map"].forEach(function(e){d.cp("-f",i.dir.repo+"/"+e,r)}),g.forEach(function(r){d.cp("-rf",i.dir.repo+"/"+r,i.dir.dist)}),s.writeFileSync(i.dir.dist+"/bower.json",t()),i.exec("git add .","Error adding files."),i.exec("git commit -m 'Release "+i.newVersion+"'","Error commiting files."),i.exec("git tag "+i.newVersion,"Error tagging "+i.newVersion+" on dist repo."),i.tagTime=i.exec("git log -1 --format='%ad'","Error getting tag timestamp.").trim()}function n(){i.chdir(i.dir.dist),i.exec("git push "+a+" master --tags","Error pushing master and tags to git repo."),i.dir.origRepo=i.dir.repo,i.dir.repo=i.dir.dist}var s=require("fs"),d=require("shelljs"),c=require(i.dir.repo+"/package.json"),a=i.remote.replace(/jquery(\.git|$)/,"jquery-dist$1"),g=["src","LICENSE.txt","AUTHORS.txt","package.json"];i.walk([i._section("Copy files to distribution repo"),e,o,i.confirmReview,i._section("Pushing files to distribution repo"),n],r)};