#!/usr/bin/env node

var GitHubApi = require('github');

var github = new GitHubApi({
  version: '3.0.0',
  debug: true,
  protocol: 'https',
  host: 'api.github.com',
  timeout: 5000,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    'user-agent': 'GPMP-GitHub-App'
  }
});

github.authenticate({
  type: "oauth",
  token: process.env.GITHUB_TOKEN
});


var owner = 'importre';
var repo = 'gpmp';
var version = '0.0.1';

github.releases.createRelease({
  owner: owner,
  repo: repo,
  tag_name: version,
  prerelease: true,
  body: ':musical_note: :guitar: :headphones: :microphone: :musical_keyboard: :musical_score: :notes:'
}, function (err, res) {
  if (err) return;

  var fs = require('fs');
  var files = fs.readdirSync('./build');
  var re = /.*tar\.gz$/;

  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    if (re.exec(file)) {
      github.releases.uploadAsset({
        owner: owner,
        id: res.id,
        repo: repo,
        name: file,
        filePath: './build/' + file
      })
    }
  }
});
