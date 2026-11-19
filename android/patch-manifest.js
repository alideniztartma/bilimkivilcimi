/* AndroidManifest.xml'e Anka'nın parçalarını ekler: canlı/bayılmış simge (activity-alias),
   widget, alarm alıcısı ve izinler. GitHub Actions'ta "npx cap add android"dan sonra çalışır. */
const fs = require('fs');
const f = 'android/app/src/main/AndroidManifest.xml';
let s = fs.readFileSync(f, 'utf8');
const launcher = /<intent-filter>\s*<action android:name="android.intent.action.MAIN"\s*\/>\s*<category android:name="android.intent.category.LAUNCHER"\s*\/>\s*<\/intent-filter>/;
if (!launcher.test(s)) throw new Error('MainActivity LAUNCHER intent-filter bulunamadı');
s = s.replace(launcher, '');
const alias = (name, on, icon) => `
        <activity-alias android:name=".${name}" android:targetActivity=".MainActivity" android:enabled="${on}" android:exported="true"
            android:icon="@mipmap/${icon}" android:roundIcon="@mipmap/${icon}" android:label="@string/app_name">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity-alias>`;
const extra = alias('AnkaAlive', true, 'ic_launcher') + alias('AnkaDead', false, 'ic_launcher_dead') + `
        <receiver android:name=".AnkaReceiver" android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.BOOT_COMPLETED" />
                <action android:name="android.intent.action.MY_PACKAGE_REPLACED" />
            </intent-filter>
        </receiver>
` + [['AnkaWidget', 'anka_widget_info', 'Anka (büyük)'], ['AnkaWidgetWide', 'anka_widget_wide_info', 'Anka (yatay)'], ['AnkaWidgetSmall', 'anka_widget_small_info', 'Anka (küçük)']].map(([n, x, l]) => `
        <receiver android:name=".${n}" android:exported="true" android:label="${l}">
            <intent-filter>
                <action android:name="android.appwidget.action.APPWIDGET_UPDATE" />
            </intent-filter>
            <meta-data android:name="android.appwidget.provider" android:resource="@xml/${x}" />
        </receiver>`).join('') + '\n';
s = s.replace('</application>', extra + '    </application>');
s = s.replace('<application', `<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
    <application`);
fs.writeFileSync(f, s);
console.log(s);
