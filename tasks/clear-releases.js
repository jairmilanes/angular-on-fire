const githubRemoveAllReleases = require('github-remove-all-releases');
const minimist = require('minimist');

const defaults = {
    manifest: './package.json',
};

const {
    owner,
    repo,
    token,
    manifest
} = minimist(process.argv.slice(2), {
    string: ['owner', 'repo', 'token', 'manifest'],
    default: defaults
});
const {GITHUB_TOKEN} = process.env;

function clearReleases(done) {
    const repository = repo || JSON.parse(fs.readFileSync(manifest, 'utf8')).name;

    githubRemoveAllReleases({
        type: 'oauth',
        token: token || GITHUB_TOKEN
    }, owner, repository, done);
}

exports.clearReleases = clearReleases;
