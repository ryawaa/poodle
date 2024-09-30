// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::{WebviewWindowBuilder, WebviewUrl};
use tauri::menu::{MenuItemBuilder, MenuBuilder,  SubmenuBuilder, Submenu};

fn main() {

    tauri::Builder::default()
        .setup(|app| {
            WebviewWindowBuilder::new(
                app,
                "poodle".to_string(),
                WebviewUrl::App("index.html".into()),
            )
            .title("Poodle")
            .inner_size(800f64, 600f64)
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
    WebviewWindowBuilder::new(
        &app,
        "new",                            
        WebviewUrl::App("/create".into()), 
    )
    .title("New")
    .inner_size(800f64, 600f64)
    .build()
    .unwrap();
}

#[tauri::command]
fn open_about_window(app: tauri::AppHandle) {
    WebviewWindowBuilder::new(
        &app,
        "about",                         
        WebviewUrl::App("/about".into()), 
    )
    .title("About")
    .inner_size(800f64, 600f64)
    .build()
    .unwrap();
}

#[tauri::command]
fn open_config_window(app: tauri::AppHandle) {
    WebviewWindowBuilder::new(
        &app,
        "config",                         
        WebviewUrl::App("/config".into()), 
    ).inner_size(640f64, 480f64)
    .title("Settings")
    .build()
    .unwrap();
}