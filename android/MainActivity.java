package org.antiochrising.bilimkivilcimi;

import android.os.Build;
import android.os.Bundle;
import android.view.Display;
import android.view.WindowManager;
import com.getcapacitor.BridgeActivity;

/* Ekranın desteklediği en yüksek yenileme hızını (ör. 120 Hz) ister.
   Android, uygulama özellikle istemezse çoğu telefonda 60 Hz'de tutar. */
public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    registerPlugin(AnkaPlugin.class);
    super.onCreate(savedInstanceState);
    highRefresh();
  }

  @Override
  public void onResume() {
    super.onResume();
    highRefresh();
  }

  private void highRefresh() {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) return;
    try {
      Display d = Build.VERSION.SDK_INT >= Build.VERSION_CODES.R ? getDisplay() : getWindowManager().getDefaultDisplay();
      if (d == null) return;
      Display.Mode cur = d.getMode();
      Display.Mode best = cur;
      for (Display.Mode m : d.getSupportedModes()) {
        if (m.getPhysicalWidth() == cur.getPhysicalWidth() && m.getPhysicalHeight() == cur.getPhysicalHeight()
            && m.getRefreshRate() > best.getRefreshRate()) best = m;
      }
      WindowManager.LayoutParams lp = getWindow().getAttributes();
      lp.preferredDisplayModeId = best.getModeId();
      lp.preferredRefreshRate = best.getRefreshRate();
      getWindow().setAttributes(lp);
    } catch (Exception e) { }
  }
}
