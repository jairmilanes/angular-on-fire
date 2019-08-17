/**
 * Removes all previously created releases.
 *
 * @task {clearReleases}
 * @arg {token} A Github personal access token, can also be set as an environment variable named GITHUB_TOKEN.
 * @arg {owner} The repository owner name.
 * @arg {repo} (optional) The Github repository name to delete releases from. Can be omitted, in which case it
 * will attempt to retrive it from the manifest path provided.
 * @arg {manifest} (optional) Path to the package.json file. Defaults to './package.json'.
 */

const { series } = require('gulp');
const log = require('gulplog');
const githubRemoveAllReleases = require('github-remove-all-releases');
const minimist = require('minimist');
const PluginError = require('plugin-error');
const fs = require('fs');

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

/**
 * Check if all necessary arguments are set.
 * @param done
 */
function checkContext(done) {
    if (!(token || GITHUB_TOKEN) || !manifest || !owner) {
        done(new PluginError(
            'clear releases',
            'Missing parameters, make sure you provide all the require ' +
            'arguments when running the release automation task'
        ))
    }
    log.info('Arguments OK, proceeding...');
    done();
}

/**
 * Removes all previously created releases.
 * @param done
 */
function clearReleases(done) {
    const repository = repo || JSON.parse(fs.readFileSync(manifest, 'utf8')).name;

    if (!repository) {
        done(new PluginError(
            'release automation',
            `Repository name is invalid, received ${repository}`
        ));
    } else {
        log.info(`Clearing releases for ${owner}/${repository}...`);

        githubRemoveAllReleases({
            type: 'oauth',
            token: token || GITHUB_TOKEN
        }, owner, repository, done);
    }
}

exports.clearReleases = series(
    checkContext,
    clearReleases
);
