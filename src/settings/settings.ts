
import {
	AppSettings,
	SettingsCategory,
	SettingSection,
	BooleanSetting,
	StringSetting,
	YTDLPSetting,
	YTDLPPathSetting} from '../classes/settings.class';


const appThemeSection = new SettingSection('Theme', [
	new StringSetting('Theme', 'Choose application theme', 'light', 'dark')
]);

const appStartupSection = new SettingSection('Startup', [
	new BooleanSetting('Start on System Startup', 'Automatically start application when system boots', false, true)
]);

const appUpdateSection = new SettingSection('Updates', [
	new BooleanSetting('Check for Updates', 'Automatically check for application updates', true, false),
	new BooleanSetting('Auto-Update', 'Automatically download and install updates', false, true)
]);

const appNotificationsSection = new SettingSection('Notifications', [
	new BooleanSetting('Show Notifications', 'Display system notifications for certain events', true, false),
	new BooleanSetting('Sound Alerts', 'Enable sound alerts for notifications', false, true)
]);

const appLanguageSection = new SettingSection('Language', [
	new StringSetting('Language', 'Set application language', 'en', 'en')
]);

const appPrivacySection = new SettingSection('Privacy', [
	new BooleanSetting('Send Usage Data', 'Send anonymous usage data to improve the app', false, false),
	new BooleanSetting('Enable Error Reporting', 'Automatically send error reports', true, false)
]);

const applicationCategory = new SettingsCategory('Application', [
	appThemeSection,
	appStartupSection,
	appUpdateSection,
	appNotificationsSection,
	appLanguageSection,
	appPrivacySection
]);


const generalErrorHandlingSection = new SettingSection('Error Handling', [
	new YTDLPSetting('Ignore Errors', 'Ignore download and post-processing errors', false, true, '--ignore-errors', '--no-ignore-errors'),
	new YTDLPSetting('Abort on Error', 'Stop downloading when an error occurs', false, true, '--abort-on-error', '--no-abort-on-error')
]);

const generalSearchSection = new SettingSection('Search', [
	new YTDLPSetting('Default Search Prefix', 'Default prefix for unqualified URLs', 'fixup_error', 'auto', '--default-search', '')
]);

const generalConfigSection = new SettingSection('Configuration', [
	new YTDLPSetting('Ignore Config Files', 'Ignore all configuration files except specified ones', false, true, '--ignore-config', '--no-config')
]);

const generalCategory = new SettingsCategory('General', [
	generalErrorHandlingSection,
	generalSearchSection,
	generalConfigSection
]);


const networkProxySection = new SettingSection('Proxy', [
	new YTDLPPathSetting('Proxy URL', 'Specify HTTP/HTTPS/SOCKS proxy URL', '', '', '--proxy', ''),
	new YTDLPPathSetting('Geo-verification Proxy', 'Proxy to verify IP address for geo-restricted sites', '', '', '--geo-verification-proxy', '')
]);

const networkTimeoutSection = new SettingSection('Timeout', [
	new YTDLPSetting('Socket Timeout', 'Specify socket timeout in seconds', 10, 30, '--socket-timeout', '')
]);

const networkIPSection = new SettingSection('IP', [
	new YTDLPSetting('Force IPv4 Connections', 'Force all connections to use IPv4', false, true, '-4', ''),
	new YTDLPSetting('Force IPv6 Connections', 'Force all connections to use IPv6', false, true, '-6', '')
]);

const networkCategory = new SettingsCategory('Network', [
	networkProxySection,
	networkTimeoutSection,
	networkIPSection
]);


const videoSelectionSection = new SettingSection('Playlist', [
	new YTDLPSetting('Download Full Playlist', 'Download entire playlist if URL contains both video and playlist', false, true, '--yes-playlist', '--no-playlist')
]);

const videoSelectionCategory = new SettingsCategory('Video', [
	videoSelectionSection
]);


const downloadConcurrencySection = new SettingSection('Concurrency', [
	new YTDLPSetting('Concurrent Downloads', 'Specify number of fragments to download at the same time', 1, 4, '--concurrent-fragments', '')
]);

const downloadRetrySection = new SettingSection('Retry', [
	new YTDLPSetting('Retry Count', 'Number of retries for failed downloads', 10, 5, '--retries', ''),
	new YTDLPSetting('Skip Unavailable Fragments', 'Skip fragments that are unavailable during download', true, false, '--skip-unavailable-fragments', '--abort-on-unavailable-fragments')
]);

const downloadBufferSection = new SettingSection('Buffer', [
	new YTDLPSetting('Download Buffer Size', 'Set size of download buffer', 1024, 4096, '--buffer-size', '')
]);

const downloadCategory = new SettingsCategory('Download', [
	downloadConcurrencySection,
	downloadRetrySection,
	downloadBufferSection
]);


const filesystemPathSection = new SettingSection('File Paths', [
	new YTDLPPathSetting('Download Path', 'Specify download directory for files', '/downloads', '/default', '--paths', '')
]);

const filesystemOutputSection = new SettingSection('Output', [
	new YTDLPPathSetting('Output Filename Template', 'Template for naming output files', '%(title)s.%(ext)s', 'NA', '--output', '')
]);

const filesystemOptionsSection = new SettingSection('File', [
	new YTDLPSetting('Restrict Filenames', 'Limit filenames to ASCII characters only', false, true, '--restrict-filenames', '--no-restrict-filenames'),
	new YTDLPSetting('Windows-Compatible Filenames', 'Force filenames to be compatible with Windows OS', false, true, '--windows-filenames', '--no-windows-filenames'),
	new YTDLPSetting('Prevent File Overwrites', 'Do not overwrite any existing files', false, true, '-w', '--force-overwrites')
]);

const filesystemCategory = new SettingsCategory('Filesystem', [
	filesystemPathSection,
	filesystemOutputSection,
	filesystemOptionsSection
]);


const thumbnailSection = new SettingSection('Thumbnail', [
	new YTDLPSetting('Save Thumbnails', 'Save video thumbnails to disk', false, true, '--write-thumbnail', '--no-write-thumbnail')
]);

const thumbnailCategory = new SettingsCategory('Thumbnail', [
	thumbnailSection
]);


export const appSettings = new AppSettings([
	applicationCategory,
	generalCategory,
	networkCategory,
	videoSelectionCategory,
	downloadCategory,
	filesystemCategory,
	thumbnailCategory
]);
