package org.antiochrising.bilimkivilcimi;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;

/* Ana ekran widget'ı (Small) */
public class AnkaWidgetSmall extends AppWidgetProvider {
  @Override
  public void onUpdate(Context c, AppWidgetManager wm, int[] ids) {
    AnkaCore.updateWidgets(c);
    AnkaCore.schedule(c);
  }
}
