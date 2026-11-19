package org.antiochrising.bilimkivilcimi;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;

/* Ana ekran widget'ı (Wide) */
public class AnkaWidgetWide extends AppWidgetProvider {
  @Override
  public void onUpdate(Context c, AppWidgetManager wm, int[] ids) {
    AnkaCore.updateWidgets(c);
    AnkaCore.schedule(c);
  }

  /* Widget büyütülüp küçültülünce uygun düzeni yeniden seç */
  @Override
  public void onAppWidgetOptionsChanged(Context c, AppWidgetManager wm, int id, android.os.Bundle o) {
    AnkaCore.updateWidgets(c);
  }
}
