package org.antiochrising.bilimkivilcimi;

import android.content.pm.PackageManager;
import android.os.Build;
import androidx.core.content.ContextCompat;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;

/* Uygulama (JavaScript) ile Anka'nın telefon tarafı arasındaki köprü */
@CapacitorPlugin(name = "Anka", permissions = { @Permission(strings = { "android.permission.POST_NOTIFICATIONS" }, alias = "notif") })
public class AnkaPlugin extends Plugin {
  @PluginMethod
  public void sync(PluginCall call) {
    getContext().getSharedPreferences(AnkaCore.P, 0).edit()
        .putInt("streak", call.getInt("streak", 0))
        .putString("last", call.getString("last", ""))
        .putInt("freeze", call.getInt("freeze", 0))
        .putString("name", call.getString("name", ""))
        .putBoolean("on", call.getBoolean("on", true))
        .putInt("hour", call.getInt("hour", 19))
        .putInt("min", call.getInt("min", 0))
        .putLong("seen", AnkaCore.todayNum())
        .putBoolean("deadSaid", false)
        .apply();
    AnkaCore.refresh(getContext());
    call.resolve();
  }

  private boolean granted() {
    return Build.VERSION.SDK_INT < 33
        || ContextCompat.checkSelfPermission(getContext(), "android.permission.POST_NOTIFICATIONS") == PackageManager.PERMISSION_GRANTED;
  }

  @PluginMethod
  public void notifState(PluginCall call) {
    JSObject r = new JSObject();
    r.put("granted", granted());
    call.resolve(r);
  }

  @PluginMethod
  public void askNotif(PluginCall call) {
    if (granted()) { notifState(call); return; }
    requestPermissionForAlias("notif", call, "notifCb");
  }

  @PluginMethod
  public void pinWidget(PluginCall call) {
    JSObject r = new JSObject();
    r.put("ok", AnkaCore.pinWidget(getContext(), call.getInt("size", 0)));
    call.resolve(r);
  }

  @PermissionCallback
  private void notifCb(PluginCall call) { notifState(call); }
}
