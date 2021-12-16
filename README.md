# OpenSpire

Re-implementation of the game logic behind an encounter in [Slay the Spire](https://www.megacrit.com/).

This is a learning project and not meant to rebuild the entire game - StS is an awesome game I have spent way too many hours with, so please buy it for the gaming platform of your choice.

Nevertheless, if ever completed this may potentially enable some interesting use cases (even if they may already be available via mods for the actual game):
* Modders can test their implementation of new characters more easily
* Player vs Player
* Developing an AI to play the game

## Motivation

Last time I developed for the web was 2009. A _lot_ has changed since then while my job has shifted away from actively writing code in the last years. I believe the best
way to learn something is to dive right in and just do it. My thought was this might be a fun project to get back into web development. Learning goals are:
* How does modern web development with Visual Studio Code feel? (if it does not happen to be [gone the next time I am trying to run it](https://github.com/microsoft/vscode/issues/52855))
* Is Typescript a great language and what are its limitations, especially compared to my favorite language C#?
* What is a good development workflow including test-driven development, linting?
* How to use GitHub Actions as a CI/CD pipeline?
* How to work with modern frontend frameworks such as Vue, Tailwind?
* How far has CSS come with Flexbox, CSS Grid, and layout frameworks surrounding it?

## Development

If you are an experienced Typescript developer and look through the code, you are very likely to see things I should/could have done better. I have tried to implement as many core features of
the game from scratch as possible to minimize dependencies, this includes simplified versions of:
* A custom [Entity Component System](https://en.wikipedia.org/wiki/Entity_component_system)
* A custom event bus
* A custom game state manager

For frameworks and tooling I opted to use what came up as a de-facto standard for JavaScript web development in 2021.
