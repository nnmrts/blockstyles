import {
	promises as fsPromises
} from "fs";
import {
	fileURLToPath
} from "url";
import {
	resolve,
	dirname
} from "path";

const {
	readFile
} = fsPromises;

const protocol = "https://";

const githubDomain = "github.com";
const discordDomain = "discord.gg";
const npmDomain = "npmjs.com";
const davidDomain = "david-dm.org";
const nodeJsDomain = "nodejs.org";
const redditDomain = "reddit.com";
const twitterDomain = "twitter.com";

const githubUser = "pumpncode"; // relevant
const githubProjectName = "template"; // relevant
const githubProject = `${githubUser}/${githubProjectName}`;
const githubPage = `${protocol}${githubDomain}/${githubProject}`;

const discordServerInvite = "WKvpetegZq"; // relevant
const discordPage = `${protocol}${discordDomain}/${discordServerInvite}`;

const npmPackage = "@pumpn/template"; // relevant
const npmPage = `${protocol}${npmDomain}/package/${npmPackage}`;

const websiteDomain = "pumpn.net"; // relevant
const websitePath = "code/projects/template"; // relevant
const websiteUrl = `${protocol}${websiteDomain}/${websitePath}`;

const modulePath = fileURLToPath(import.meta.url);

const moduleDir = dirname(modulePath);

const websiteLogoFilePath = resolve(moduleDir, "../../../../media/images/websitelogo.png");
const websiteLogoFile = await readFile(websiteLogoFilePath);
const websiteLogo = `data:image/png;base64,${Buffer.from(websiteLogoFile).toString("base64")}`;

const davidPage = `${protocol}${davidDomain}`;
const davidDependenciesPage = `${davidPage}/${githubProject}`;
const davidDevDependenciesPage = `${davidPage}/${githubProject}?type=dev`;
const davidPeerDependenciesPage = `${davidPage}/${githubProject}?type=peer`;

const nodeJsPage = `${protocol}${nodeJsDomain}`;

const subreddit = "pumpnuniverse"; // relevant
const subredditPage = `${protocol}${redditDomain}/r/${subreddit}`;

const twitter = "PumpnUniverse"; // relevant
const twitterPage = `${protocol}${twitterDomain}/${twitter}`;

const badgeGroups = [
	[
		[
			"stars",
			`github/stars/${githubProject}`,
			`${githubPage}/stargazers`,
			"github"
		],
		[
			"contributors",
			`github/contributors/${githubProject}`,
			`${githubPage}/graphs/contributors`,
			"github"
		],
		[
			"forks",
			`github/forks/${githubProject}`,
			`${githubPage}/network/members`,
			"github"
		],
		[
			"open-issues",
			`github/open-issues/${githubProject}`,
			`${githubPage}/issues?q=is%3Aopen+is%3Aissue`,
			"github"
		],
		[
			"closed-issues",
			`github/closed-issues/${githubProject}`,
			`${githubPage}/issues?q=is%3Aclosed+is%3Aissue`,
			"github"
		],
		[
			"open-prs",
			`github/open-prs/${githubProject}`,
			`${githubPage}/pulls?q=is%3Aopen+is%3Apr`,
			"github",
			"open pull requests"
		],
		[
			"closed-prs",
			`github/closed-prs/${githubProject}`,
			`${githubPage}/pulls?q=is%3Aclosed+is%3Apr`,
			"github",
			"closed pull requests"
		]
	],
	[
		[
			"license",
			`github/license/${githubProject}`,
			`${githubPage}/blob/master/license.md`,
			"github"
		],
		[
			"dependencies",
			`david/dep/${githubProject}`,
			davidDependenciesPage,
			"npm",
			"dependencies"
		],
		[
			"dev-dependencies",
			`david/dev/${githubProject}`,
			davidDevDependenciesPage,
			"npm",
			"devDependencies"
		],
		[
			"peer-dependencies",
			`david/peer/${githubProject}`,
			davidPeerDependenciesPage,
			"npm",
			"peerDependencies"
		]
	],
	[
		[
			"downloads",
			`npm/dm/${npmPackage}`,
			npmPage,
			"npm",
			"downloads"
		],
		[
			"version",
			`npm/v/${npmPackage}`,
			npmPage,
			"npm",
			"version"
		],
		[
			"node",
			`npm/node/${npmPackage}`,
			nodeJsPage,
			"https://simpleicons.now.sh/node-dot-js/fff"
		]
	],
	[
		[
			"reddit",
			"badge/subreddit/subreddit",
			subredditPage,
			"https://simpleicons.now.sh/reddit/fff",
			""
		],
		[
			"twitter",
			"badge/twitter/twitter",
			twitterPage,
			"twitter",
			""
		],
		[
			"discord",
			"badge/discord/discord",
			discordPage,
			"discord",
			""
		]
	],
	[
		[
			"website",
			"badge/website/website",
			websiteUrl,
			websiteLogo,
			""
		]
	]
]
	.map((group) => group.map(([
		name,
		endpoint,
		link,
		icon,
		label
	]) => ({
		endpoint,
		icon,
		label,
		link,
		name
	})));

export default badgeGroups;
