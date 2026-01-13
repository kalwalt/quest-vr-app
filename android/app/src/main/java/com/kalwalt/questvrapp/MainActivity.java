package com.kalwalt.questvrapp;

import android.os.Bundle;
import android.webkit.PermissionRequest; // <--- FONDAMENTALE PER VR
import android.webkit.SslErrorHandler;
import android.webkit.WebChromeClient;   // <--- FONDAMENTALE PER VR
import android.webkit.WebSettings;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.BridgeWebViewClient;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        WebView webView = this.getBridge().getWebView();
        WebSettings settings = webView.getSettings();

        // --- 1. CONFIGURAZIONE GENERALE ---
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setJavaScriptEnabled(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);

        // --- 2. FIX RETE (Localhost & SSL) ---
        webView.setWebViewClient(new BridgeWebViewClient(this.getBridge()) {
            @Override
            public void onReceivedSslError(WebView view, SslErrorHandler handler, android.net.http.SslError error) {
                handler.proceed(); // Ignora errori SSL (per https://localhost)
            }
        });

        // --- 3. FIX PERMESSI VR (Il pezzo mancante!) ---
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onPermissionRequest(final PermissionRequest request) {
                // Quando Three.js chiede "Posso usare il VR?", noi rispondiamo "SÌ!" a tutto.
                request.grant(request.getResources());
            }
        });
    }
}