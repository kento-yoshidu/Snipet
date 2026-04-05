mod cli;
mod commands;
mod storage;
mod todo;

use clap::Parser;
use cli::{Cli, Command};

fn main() {
    let cli = Cli::parse();
    match cli.command {
        Command::Add { title, priority } => commands::add::run(title, priority),
        Command::List { filter } => commands::list::run(filter),
        Command::Done { id } => commands::done::run(id),
        Command::Delete { id } => commands::delete::run(id),
    }
}
