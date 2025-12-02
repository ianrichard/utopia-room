# Abstract UI

## Overview

This is a WIP project I just started that will explore the viability of creating an API-driven configuration via JS or JSON for generating user interfaces vs explicitly coding them with React or any other framework.

## How to Run

```terminal
git clone git@github.com:ianrichard/utopia-room.git
npm install
npm run start
```

- Local [http://localhost:8080/](http://localhost:8080/)
- Gitpod - click the link generated in the terminal

## Thanks

Thanks to who made the [react-webpack-babel](https://github.com/ReactJSResources/react-webpack-babel) lightweight boilerplate project I used as a starting point for this project. This also has Sass hooked up, so was exactly what I was looking for.

## Roadmap

### Pre-Release

- Random v0 stuff
  - Clean up lint stuff
- Add all material components
- Add component GUI
  - Create + button
  - Create components pane with position toggle
  - Click + to append components to page
- Add child component
  - Add available children metadata to each component
  - Add + button to each available child area
- Create edit pane
  - Create edit pane
  - Add editable props on each component
  - Add edit button to each component
  - Add remove button to each component
- Create edit vs display mode
- JSON export
- Documentation
- Second library
- Third library
- Create patterns
- Create templates
- Contribution docs

## Post-v1

- Async support
- Persist to back end
- Multiple page support
- Draft vs publish modes 
- Themes
- Proprietary props
- Formatters 
- Better lint settings
- Check project for cruft code
- Update libraries to latest
- Code splitting 
- Events callbacks for forms
- Event callbacks for analytics
- Page flow component
- Browser routing
- Private user accounts
- Project sharing
- Unit tests
- Edit versioning
- Last working state mode
- Multi person edit mode
- Locking 
- Host demo
- Cut / copy / paste
- Keyboard shortcut toggles for panes