# Introduction to Web and using GitHub

Git is a distributed version control system that allows developers to track changes to their code and collaborate with others on projects. GitHub is a web-based platform that provides hosting for Git repositories, as well as a range of other features for managing software projects.

In this documentation, we will cover the basics of Git and GitHub, including how to set up a local Git repository, commit changes, and push those changes to a remote repository on GitHub.

## Installing Git

Before you can start using Git, you need to install it on your local machine. You can download Git from the official Git website at https://git-scm.com/downloads. Once you have downloaded the installer, follow the prompts to complete the installation.

## Creating a Git Repository

To create a new Git repository on your local machine, navigate to the directory where you want to store your project files and run the following command:
```git
git init
```
This will create a new Git repository in the current directory.

## Making Changes and Committing Them

Once you have created a Git repository, you can start making changes to your project files. To track those changes with Git, you need to stage them for committing by running the following command:
```
git add <filename>
```
This will stage the specified file for committing. You can also stage all changes in the current directory by running:
```
git add .
```
