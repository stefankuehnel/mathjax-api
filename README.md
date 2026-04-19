# MathJax API

[![CI](../../../actions/workflows/ci.yaml/badge.svg?label=CI&logo=forgejo&logoColor=white&style=flat-square)](../../../actions?workflow=ci.yaml)

A MathJax API for rendering TeX formulas as SVG images.

## Get Started

To get started with the project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://codeberg.org/stefankuehnel/mathjax-api.git
   cd mathjax-api
   ```

2. **Install dependencies:**

   ```bash
   task install
   ```

3. **Initialize project:**

   ```bash
   task init --interactive
   ```

4. **Run the development server:**

   ```bash
   task dev
   ```

5. **Open your browser:**

   Navigate to `http://localhost:5173/`.

## Development

This project uses [Task](https://taskfile.dev) as a task runner.

### Available Tasks

```bash
# Run default task
task

# Initialize project
task init

# Install dependencies
task install

# Run development server
task dev

# Run checks
task check

# Run tests
task test

# Run tests in watch mode
task test:watch

# Run tests with coverage
task test:coverage

# Build project
task build

# Deploy project
task deploy

# Format code and nix files
task format

# Clean generated docs
task clean
```

## Documentation

Below you will find a list of documentation for tools used in this project.

- **Hono**: A Web Framework for Building APIs - [Docs](https://hono.dev)
- **MathJax**: A JavaScript Display Engine for Mathematics - [Docs](https://mathjax.org)
- **Nix**: Nix Package Manager - [Docs](https://wiki.nixos.org/wiki/Nix)
- **Nix Flakes**: An Experimental Feature for Managing Dependencies of Nix Projects - [Docs](https://wiki.nixos.org/wiki/Flakes)
- **Task**: A Task Runner / Build Tool written in Go - [Docs](https://taskfile.dev/)
- **Forgejo Actions**: Automation and Execution of Software Development Workflows - [Docs](https://forgejo.org/docs/latest/user/actions/reference/)

## Found a Bug?

Thank you for your message! Please fill out a [bug report](../../../issues/new?assignees=&labels=&template=bug_report.md&title=).

## License

This project is licensed under the [GNU General Public License](https://www.gnu.org/licenses/gpl-3.0.txt).
