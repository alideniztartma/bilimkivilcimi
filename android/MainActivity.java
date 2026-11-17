package org.antiochrising.bilimkivilcimi;

import android.os.Bundle;
import android.view.Display;
import android.view.WindowManager;
import com.getcapacitor.BridgeActivity;

/* Ekranın desteklediği en yüksek yenileme hızını (120 Hz gibi) iste.
   Android varsayılan olarak WebView uygulamalarını çoğu zaman 60 Hz'de tutar. */
public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    highRefresh();
  }

  @Override
  public void onResume() {
    super.onResume();
    highRefresh();
  }

  private void highRefresh() {
    try {
      Display d = getWindowManager().getDefaultDisplay();
      Display.Mode cur = d.getMode(), best = cur;
      for (Display.Mode m : d.getSupportedModes()) {
        if (m.getPhysicalWidth() == cur.getPhysicalWidth() && m.getPhysicalHeight() == cur.getPhysicalHeight()
            && m.getRefreshRate() > best.getRefreshRate()) best = m;
      }
      WindowManager.LayoutParams lp = getWindow().getAttributes();
      lp.preferredDisplayModeId = best.getModeId();
      lp.preferredRefreshRate = best.getRefreshRate();
      getWindow().setAttributes(lp);
    } catch (Throwable t) { }
  }
}
