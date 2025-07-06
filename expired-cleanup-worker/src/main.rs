use chrono::Utc;
use postgres::{Client, Error, NoTls};
use std::{thread, time::Duration};

fn main() -> Result<(), Error> {
    let connection_string = std::env::args().nth(1).expect("Missing Database URL: No DB URL in format `postgresql://<user>:<password>@<host>:<port>/<database>` provided");
    let mut client = Client::connect(&connection_string, NoTls).map_err(|e| {
        eprintln!("Failed to connect to database: {}", e);
        e
    })?;

    loop {
        match clean_expired_entries(&mut client) {
            Ok(rows_deleted) => {
                let now = Utc::now().format("%Y-%m-%d %H:%M:%S%.3f").to_string();
                println!("{} - Removed {} rows.", now, rows_deleted);
            }
            Err(e) => {
                eprintln!("Error deleting rows: {}. Retrying in 30 seconds.", e);
            }
        }

        thread::sleep(Duration::from_secs(30));
    }
}

fn clean_expired_entries(connection_string: &str) -> Result<u64, Error> {
    let mut client = Client::connect(connection_string, NoTls).map_err(|e| {
        eprintln!("Failed to connect to database: {}", e);
        e
    })?;
    let rows_deleted =
        client.execute("DELETE FROM seec.secret WHERE auto_expire_at < NOW();", &[])?;
    Ok(rows_deleted)
}
