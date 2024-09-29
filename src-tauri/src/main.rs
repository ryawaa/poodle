// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::{CustomMenuItem, Menu, MenuItem, Submenu, WindowBuilder, WindowUrl};

fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit".to_string());
    let about = CustomMenuItem::new("about".to_string(), "About Poodle".to_string());
    let submenu = Submenu::new("File", Menu::new().add_item(quit).add_item(about));
    let menu = Menu::new().add_submenu(submenu);

    tauri::Builder::default()
        .setup(|app| {
            WindowBuilder::new(
                app,
                "poodle".to_string(),
                tauri::WindowUrl::App("index.html".into()),
            )
            .menu(menu)
            .title("Poodle")
            .build()?;
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            open_new_window,
            open_about_window,
            open_config_window
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn open_new_window(app: tauri::AppHandle) {
    WindowBuilder::new(
        &app,
        "new",                            
        WindowUrl::App("/create".into()), 
    )
    .title("New")
    .build()
    .unwrap();
}

#[tauri::command]
fn open_about_window(app: tauri::AppHandle) {
    WindowBuilder::new(
        &app,
        "about",                         
        WindowUrl::App("/about".into()), 
    )
    .title("About")
    .build()
    .unwrap();
}

#[tauri::command]
fn open_config_window(app: tauri::AppHandle) {
    WindowBuilder::new(
        &app,
        "config",                         
        WindowUrl::App("/config".into()), 
    )
    .title("Settings")
    .build()
    .unwrap();
}
