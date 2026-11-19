package org.antiochrising.bilimkivilcimi;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

/* Hatırlatma ve gece yarısı alarmları; telefon yeniden açılınca alarmları kurar */
public class AnkaReceiver extends BroadcastReceiver {
  @Override
  public void onReceive(Context c, Intent i) {
    String a = i == null ? null : i.getAction();
    if (AnkaCore.A_REMIND.equals(a)) AnkaCore.remind(c);
    else if (AnkaCore.A_TICK.equals(a)) AnkaCore.tick(c);
    AnkaCore.refresh(c);
  }
}
