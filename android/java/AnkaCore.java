package org.antiochrising.bilimkivilcimi;

import android.app.AlarmManager;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.BitmapFactory;
import android.os.Build;
import android.widget.RemoteViews;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import java.util.Calendar;
import java.util.TimeZone;

/* Anka'nın uygulama dışındaki hâli: seri durumu, ana ekran widget'ı, hatırlatma bildirimleri ve
   seri bitince "bayılmış Anka" simgesi. Uygulama her açılışta durumu sync() ile buraya yazar. */
public final class AnkaCore {
  static final String P = "anka";
  static final String CH = "hatirlatma";
  static final String A_REMIND = "org.antiochrising.bilimkivilcimi.REMIND";
  static final String A_TICK = "org.antiochrising.bilimkivilcimi.TICK";
  static final long DAY = 86400000L;

  static SharedPreferences sp(Context c) { return c.getSharedPreferences(P, Context.MODE_PRIVATE); }

  /* "YYYY-AA-GG" -> gün numarası (saat diliminden bağımsız) */
  static long dayNum(String k) {
    if (k == null || k.length() < 10) return -1;
    try {
      Calendar u = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
      u.clear();
      u.set(Integer.parseInt(k.substring(0, 4)), Integer.parseInt(k.substring(5, 7)) - 1, Integer.parseInt(k.substring(8, 10)));
      return u.getTimeInMillis() / DAY;
    } catch (Exception e) { return -1; }
  }
  static long todayNum() {
    Calendar c = Calendar.getInstance();
    Calendar u = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
    u.clear();
    u.set(c.get(Calendar.YEAR), c.get(Calendar.MONTH), c.get(Calendar.DAY_OF_MONTH));
    return u.getTimeInMillis() / DAY;
  }
  /* bugünden n gün sonra, yerel saatle h:m */
  static long at(int n, int h, int m) {
    Calendar c = Calendar.getInstance();
    c.add(Calendar.DAY_OF_YEAR, n);
    c.set(Calendar.HOUR_OF_DAY, h); c.set(Calendar.MINUTE, m); c.set(Calendar.SECOND, 0); c.set(Calendar.MILLISECOND, 0);
    return c.getTimeInMillis();
  }

  static int streak(Context c) { return sp(c).getInt("streak", 0); }
  static long lastN(Context c) { return dayNum(sp(c).getString("last", "")); }
  static boolean doneToday(Context c) { return lastN(c) == todayNum(); }
  /* Seri, son dersten sonraki gün (ve seri koruyucuların kurtardığı günler) boş geçince biter */
  static boolean dead(Context c) {
    long l = lastN(c);
    return streak(c) > 0 && l >= 0 && todayNum() >= l + 2 + sp(c).getInt("freeze", 0);
  }
  static boolean lastChance(Context c) {
    long l = lastN(c);
    return streak(c) > 0 && l >= 0 && !dead(c) && todayNum() == l + 1 + sp(c).getInt("freeze", 0);
  }

  /* Her şeyi güncelle: simge, widget, alarmlar */
  static void refresh(Context c) {
    setIcon(c, dead(c));
    updateWidgets(c);
    schedule(c);
  }

  /* ---------- Simge ---------- */
  static boolean isOn(PackageManager pm, ComponentName cn, boolean def) {
    int st = pm.getComponentEnabledSetting(cn);
    if (st == PackageManager.COMPONENT_ENABLED_STATE_ENABLED) return true;
    if (st == PackageManager.COMPONENT_ENABLED_STATE_DEFAULT) return def;
    return false;
  }
  static void setIcon(Context c, boolean dead) {
    try {
      PackageManager pm = c.getPackageManager();
      String pkg = c.getPackageName();
      ComponentName alive = new ComponentName(pkg, pkg + ".AnkaAlive");
      ComponentName rip = new ComponentName(pkg, pkg + ".AnkaDead");
      boolean aliveOn = isOn(pm, alive, true), ripOn = isOn(pm, rip, false);
      if (dead ? (ripOn && !aliveOn) : (aliveOn && !ripOn)) return;
      ComponentName on = dead ? rip : alive, off = dead ? alive : rip;
      /* Önce yenisini aç, sonra eskisini kapat: uygulamanın simgesiz kaldığı bir an olmasın */
      pm.setComponentEnabledSetting(on, PackageManager.COMPONENT_ENABLED_STATE_ENABLED, PackageManager.DONT_KILL_APP);
      pm.setComponentEnabledSetting(off, PackageManager.COMPONENT_ENABLED_STATE_DISABLED, PackageManager.DONT_KILL_APP);
    } catch (Exception e) { }
  }

  /* ---------- Widget ---------- */
  static final Class<?>[] WIDGETS = { AnkaWidget.class, AnkaWidgetWide.class, AnkaWidgetSmall.class };
  static final int[] LAYOUTS = { R.layout.anka_widget, R.layout.anka_widget_wide, R.layout.anka_widget_small };

  static void updateWidgets(Context c) {
    AppWidgetManager wm = AppWidgetManager.getInstance(c);
    int s = streak(c);
    /* Durum: 0 bugün tamam, 1 bekliyor, 2 henüz seri yok, 3 bayıldı */
    int st = dead(c) ? 3 : doneToday(c) ? 0 : s > 0 ? 1 : 2;
    int[] imgs = { R.drawable.anka_w_happy, R.drawable.anka_w_sad, R.drawable.anka_w_wave, R.drawable.anka_w_dead };
    int[] bgs = { R.drawable.w_bg_done, R.drawable.w_bg_wait, R.drawable.w_bg_new, R.drawable.w_bg_dead };
    String sub = st == 0 ? "Bugün tamam!" : st == 1 ? (lastChance(c) ? "Serini kurtar!" : "Ders zamanı!") : st == 2 ? "Hadi başlayalım!" : "Anka bayıldı!";
    int ink = st == 2 ? 0xFF7A2E16 : 0xFFFFFFFF;
    for (int k = 0; k < WIDGETS.length; k++) {
      try {
        int[] ids = wm.getAppWidgetIds(new ComponentName(c, WIDGETS[k]));
        if (ids == null || ids.length == 0) continue;
        RemoteViews rv = new RemoteViews(c.getPackageName(), LAYOUTS[k]);
        rv.setImageViewResource(R.id.w_img, imgs[st]);
        rv.setImageViewResource(R.id.w_flame, st == 0 ? R.drawable.w_flame_on : R.drawable.w_flame_off);
        rv.setTextViewText(R.id.w_num, String.valueOf(st == 3 ? 0 : s));
        rv.setInt(R.id.w_root, "setBackgroundResource", bgs[st]);
        if (k != 2) {
          rv.setTextViewText(R.id.w_sub, sub);
          rv.setTextColor(R.id.w_sub, ink);
          rv.setTextColor(R.id.w_num, ink);
          if (k == 0) rv.setInt(R.id.w_sub, "setBackgroundResource", st == 2 ? R.drawable.w_pill_dark : R.drawable.w_pill);
        }
        rv.setOnClickPendingIntent(R.id.w_root, openApp(c, 10 + k));
        wm.updateAppWidget(ids, rv);
      } catch (Exception e) { }
    }
  }

  /* Ayarlar'dan "ana ekrana ekle" (Android 8+, başlatıcı destekliyorsa) */
  static boolean pinWidget(Context c, int k) {
    try {
      if (Build.VERSION.SDK_INT < 26) return false;
      AppWidgetManager wm = c.getSystemService(AppWidgetManager.class);
      if (wm == null || !wm.isRequestPinAppWidgetSupported()) return false;
      return wm.requestPinAppWidget(new ComponentName(c, WIDGETS[Math.max(0, Math.min(2, k))]), null, null);
    } catch (Exception e) { return false; }
  }

  static PendingIntent openApp(Context c, int code) {
    Intent i = c.getPackageManager().getLaunchIntentForPackage(c.getPackageName());
    if (i == null) i = new Intent(c, MainActivity.class);
    i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
    return PendingIntent.getActivity(c, code, i, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
  }

  /* ---------- Alarmlar ---------- */
  static PendingIntent alarmPi(Context c, String action, int code) {
    Intent i = new Intent(c, AnkaReceiver.class).setAction(action);
    return PendingIntent.getBroadcast(c, code, i, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
  }
  static void schedule(Context c) {
    AlarmManager am = (AlarmManager) c.getSystemService(Context.ALARM_SERVICE);
    if (am == null) return;
    long now = System.currentTimeMillis();
    /* Gece yarısı: widget'ı tazele, seri bittiyse simgeyi değiştir */
    am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, at(1, 0, 0) + 20000, alarmPi(c, A_TICK, 2));
    PendingIntent rp = alarmPi(c, A_REMIND, 1);
    long next = nextReminder(c, now);
    if (next > 0) am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, next, rp); else am.cancel(rp);
  }
  /* Bir sonraki hatırlatma: her gün seçilen saatte, serinin son günü ayrıca 21:30'da.
     Ders yapılmayan 4 günden sonra hatırlatmayı bırakır. */
  static long nextReminder(Context c, long now) {
    SharedPreferences p = sp(c);
    if (!p.getBoolean("on", true)) return 0;
    int h = p.getInt("hour", 19), m = p.getInt("min", 0);
    long base = Math.max(lastN(c), p.getLong("seen", -1)), today = todayNum();
    for (int n = 0; n <= 5; n++) {
      long d = today + n;
      if (base >= 0 && d > base + 4) break;
      if (d == lastN(c)) continue;
      long t1 = at(n, h, m);
      if (t1 > now) return t1;
      long t2 = at(n, 21, 30);
      if (h < 21 && t2 > now && streak(c) > 0 && d == lastN(c) + 1 + p.getInt("freeze", 0)) return t2;
    }
    return 0;
  }

  /* ---------- Bildirimler ---------- */
  static void channel(Context c) {
    if (Build.VERSION.SDK_INT < 26) return;
    NotificationManager nm = c.getSystemService(NotificationManager.class);
    if (nm == null || nm.getNotificationChannel(CH) != null) return;
    NotificationChannel ch = new NotificationChannel(CH, "Günlük hatırlatma", NotificationManager.IMPORTANCE_DEFAULT);
    ch.setDescription("Anka günlük dersini ve serini hatırlatır");
    nm.createNotificationChannel(ch);
  }
  static void notify(Context c, int id, String title, String text, int img) {
    try {
      channel(c);
      NotificationCompat.Builder b = new NotificationCompat.Builder(c, CH)
          .setSmallIcon(R.drawable.ic_stat_anka)
          .setColor(0xFFD9822B)
          .setContentTitle(title)
          .setContentText(text)
          .setStyle(new NotificationCompat.BigTextStyle().bigText(text))
          .setLargeIcon(BitmapFactory.decodeResource(c.getResources(), img))
          .setContentIntent(openApp(c, 11))
          .setAutoCancel(true)
          .setPriority(NotificationCompat.PRIORITY_DEFAULT);
      NotificationManagerCompat.from(c).notify(id, b.build());
    } catch (SecurityException e) { } catch (Exception e) { }
  }
  static String nm(Context c) { String n = sp(c).getString("name", ""); return n == null ? "" : n.trim(); }

  /* Hatırlatma zamanı geldi: bugün ders yapılmadıysa uygun mesajı gönder */
  static void remind(Context c) {
    if (doneToday(c) || !sp(c).getBoolean("on", true)) return;
    int s = streak(c);
    String n = nm(c);
    long base = Math.max(lastN(c), sp(c).getLong("seen", -1));
    long away = base >= 0 ? todayNum() - base : 0;
    Calendar now = Calendar.getInstance();
    boolean late = now.get(Calendar.HOUR_OF_DAY) >= 21;
    if (dead(c)) return;
    if (lastChance(c) && late) {
      notify(c, 1, "Serin bitmek üzere! 🔥", s + " günlük serin gece yarısı sönecek. Anka çok üzülecek… Hemen bir ders yap!", R.drawable.anka_w_sad);
      return;
    }
    String[][] msgs;
    if (away <= 1) msgs = new String[][] {
        { "Anka seni bekliyor!", (n.isEmpty() ? "" : n + ", ") + "bugünkü dersin sadece 5 dakika. Hadi kıvılcımı yakalım! ✨" },
        { "Bugün ne öğreniyoruz?", "Anka yeni bir şey öğrenmek istiyor. Sen de gelsene!" },
        { s > 0 ? s + " günlük seri! 🔥" : "Kıvılcım zamanı! ⚡", s > 0 ? "Serini bir gün daha uzatmak için kısa bir ders yeter." : "Bir ders yap, ilk serini başlat!" } };
    else if (away == 2) msgs = new String[][] { { "Anka seni özledi 🪶", "Yuvada seni bekliyor. Kısa bir ders yapıp onu sevindirir misin?" } };
    else if (away == 3) msgs = new String[][] { { "Anka biraz üzgün…", "Birlikte öğrendiğimiz günleri hatırlıyor musun? Bir ders yeter." } };
    else msgs = new String[][] { { "Bu hatırlatmalar işe yaramıyor gibi 😔", "Anka artık hatırlatmayı bırakacak. Ama ne zaman istersen burada seni bekliyor." } };
    String[] m = msgs[(int) (todayNum() % msgs.length)];
    notify(c, 1, m[0], m[1], away >= 2 ? R.drawable.anka_w_sad : R.drawable.anka_w_happy);
  }

  /* Gece yarısı: seri bittiyse Anka bayılır */
  static void tick(Context c) {
    SharedPreferences p = sp(c);
    if (dead(c) && !p.getBoolean("deadSaid", false)) {
      p.edit().putBoolean("deadSaid", true).apply();
      if (p.getBoolean("on", true))
        notify(c, 2, "Anka bayıldı 😵", streak(c) + " günlük serin bitti. Bir ders yap, Anka'yı yeniden canlandır!", R.drawable.anka_w_dead);
    }
  }
}
