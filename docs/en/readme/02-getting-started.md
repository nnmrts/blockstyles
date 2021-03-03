# Getting Started

## Prerequisites

If you're a developer, you'll presumably have those or working alternatives, feel free to skip to the [Installation section](#installation). This guide expects you have [Windows](https://www.microsoft.com/windows), or a Unix or Unix-like operating system ([macOS](https://www.apple.com/macos) for example) and a [modern browser](https://browsehappy.com/) installed. This project should work on every imaginable modern system configuration, but your best bet would be to use a well established and popular one.

- [GitHub Account](https://github.com/join) 💎
- [Homebrew](https://brew.sh/) 🍎

	```sh
	/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
	```

- [Git](https://git-scm.com/)
	- [macOS](https://git-scm.com/download/mac) 🍎
		- Homebrew 💎

			```sh
			brew install git
			```
		
		- [Binary Installer](https://sourceforge.net/projects/git-osx-installer/)
		- [Through Xcode](https://developer.apple.com/xcode/) 🤡
			> Installing Git through Xcode, which was a dozen gigabytes large and took an hour to setup last time I checked, is a classic [Pyrrhic victory](https://en.wikipedia.org/wiki/Pyrrhic_victory). If you already have Xcode, I guess it's fine to use "their" Git though.
	- [Windows](https://git-scm.com/download/win) 🪟
	- [Linux](https://git-scm.com/download/linux) 🐧

- [Node.js](https://nodejs.org/)
	- Install through [nvm](https://github.com/nvm-sh/nvm) 💎
		- macOS, Linux & WSL 💎
			1. Install [nvm](https://github.com/nvm-sh/nvm)

				```sh
				curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
				```

			2. Install the latest Node.js

				```sh
				nvm install node
				````
		
		- Windows 🪟
			1. Install [nvm-windows](https://github.com/coreybutler/nvm-windows)
			2. Install the latest Node.js

				```sh
				nvm install latest
				```

	- [Download and install directly](https://nodejs.org/en/download/current/)
- [A source-code editor](https://en.wikipedia.org/wiki/Source-code_editor#Notable_examples)

## Installation

1. Get the template
	- Create a new repository from template 💎
		1. Click "Use this template"
			![Screenshot of "Use this template" button](../../../media/images/screenshot-use-template.png)
		2. Fill in the details, check "Include all branches" and click "Create repository from template"
			![Screenshot of Create a new repository from template screen](../../../media/images/screenshot-create-from-template.png)
		3. Clone your new repository

			```sh
			git clone https://github.com/username/my-new-repository.git
			```

	- Create a new repository by cloning 🤡
		> This completely defeats the purpose of the GitHub template feature, because normal clones (and forks) copy the whole commit history (and other things) but not all branches, which normally isn't what you want when creating a new project based on a boilerplate. Read more [here](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template#about-repository-templates).
		1. Clone this repository into a new folder

			```sh
			git clone https://github.com/pumpncode/template.git my-new-repository
			```

2. Set it up
	1. Go into your new repository folder

		```sh
		cd my-new-repository
		```

	2. Install the dependencies

		```sh
		npm install
		```
