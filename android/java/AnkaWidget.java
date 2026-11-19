package org.antiochrising.bilimkivilcimi;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;

/* Ana ekran widget'ı: Anka ve seri */
public class AnkaWidget extends AppWidgetProvider {
  @Override
  public void onUpdate(Context c, AppWidgetManager wm, int[] ids) {
    AnkaCore.updateWidgets(c);
    AnkaCore.schedule(c);
  }
}
