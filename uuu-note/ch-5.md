# FLUSH DNS
Sounds like you mean **“DNS cache”** — here’s a compact, practical guide to clearing it on the platforms people commonly use, plus verification and troubleshooting steps.

# Why flush DNS?

Flushing forces your system to re-query DNS servers for domain name → IP mappings. Do this when a site moved IPs, you see stale/incorrect pages, or for privacy/troubleshooting.

# Windows (10 / 11 / Server)

1. Open **Command Prompt as Administrator** (right‑click → “Run as administrator”).
2. Run:

```
ipconfig /flushdns
```

You should see: *Windows IP Configuration. Successfully flushed the DNS Resolver Cache.*

If DNS Client service is strange, restart it:

```
net stop dnscache
net start dnscache
```

# macOS

Open **Terminal** and run (use sudo; you’ll be prompted for your password):

For most modern macOS versions (Catalina, Big Sur, Monterey, Ventura, Sonoma, etc.):

```
sudo killall -HUP mDNSResponder
sudo dscacheutil -flushcache
```

(Using both is harmless and covers more versions.)

Older macOS had different commands, but the two above cover current releases.

# Linux

Depends on resolver:

* **systemd-resolved** (Ubuntu 18.04+ / many modern distros):

```
sudo resolvectl flush-caches
# or
sudo systemd-resolve --flush-caches
```

* **nscd**:

```
sudo systemctl restart nscd
# or
sudo /etc/init.d/nscd restart
```

* **dnsmasq**:

```
sudo systemctl restart dnsmasq
```

If you’re not sure which is running, try the systemd command, then restart networking if needed:

```
sudo systemctl restart NetworkManager
```

# Web browsers (flush browser DNS / cache)

Browsers keep their own DNS/cache. Example:

* **Chrome**: go to `chrome://net-internals/#dns` → Click **Clear host cache**. Also clear browsing cache: Settings → Privacy → Clear browsing data.
* **Firefox**: Settings → Privacy & Security → Clear Data (or about:config for some internal caches).
* Or just clear site data for the offending site.

# Android

* Easiest: toggle **Airplane mode** on → off, or restart device.
* For Chrome: Settings → Apps → Chrome → Storage → Clear cache.
* If using Private DNS (Android 9+), try toggling it off/on: Settings → Network & internet → Advanced → Private DNS.

# iPhone / iPad (iOS)

* Toggle **Airplane mode** or restart device.
* For Safari: Settings → Safari → Clear History and Website Data.
* If using a custom DNS profile, remove/modify it via Settings.

# Router / ISP cache

* Reboot the router (power cycle) — this often clears its DNS cache.
* Some routers have a “Restart” or “Flush DNS” option in web UI.
* If issues persist, ISP upstream DNS caching may be the cause — try a public DNS (e.g., 8.8.8.8, 1.1.1.1) as a test.

# Verify DNS after flushing

Use these commands to check what IP your system resolves now:

* `nslookup example.com`
* `dig example.com`  (Linux/macOS, or Windows with BIND tools)
* `ping -c 1 example.com`  (Linux/macOS) or `ping -n 1 example.com` (Windows)

If the IP matches what you expect, cache flush succeeded.

# Common troubleshooting

* Check **/etc/hosts** (Linux/macOS) or `C:\Windows\System32\drivers\etc\hosts` (Windows) — local entries override DNS.
* Disable VPN or proxy temporarily (they can have their own DNS behavior).
* Try alternative DNS servers:

  * Google: `8.8.8.8` and `8.8.4.4`
  * Cloudflare: `1.1.1.1` and `1.0.0.1`
* Clear browser cache separately (site content may be cached even after DNS is refreshed).
* If you control the authoritative DNS, check TTLs — if TTLs are long, caches may persist until TTL expires.

# Quick one‑liners (copy/paste)

Windows:

```
ipconfig /flushdns
```

macOS:

```
sudo killall -HUP mDNSResponder && sudo dscacheutil -flushcache
```

Ubuntu (systemd):

```
sudo resolvectl flush-caches
```

---

在 Windows 系統中，「主機名稱解析」（Hostname Resolution）是將主機名稱（如 `example.com` 或 `myserver`）轉換為 IP 位址（如 `192.168.1.10`）的過程。這是網路通訊的基礎之一。以下是 **Windows 中主機名稱解析的完整流程（依照優先順序）**：

---

### 🔍 **Windows 主機名稱解析流程（優先順序）**

1. ### **本機快取（DNS Cache）**

   * Windows 會先檢查是否已有該主機名稱的解析紀錄存在於「DNS 快取」中。
   * 可用 `ipconfig /displaydns` 查看。
   * 快取可以加快解析速度，避免重複查詢。

2. ### **Hosts 檔案**

   * 路徑：`C:\Windows\System32\drivers\etc\hosts`
   * 這是使用者自訂的名稱解析表，會在 DNS 查詢前優先參考。
   * 例如：

     ```
     127.0.0.1   localhost
     192.168.1.100   myserver
     ```

3. ### **DNS（Domain Name System）**

   * 如果快取與 hosts 檔都找不到，系統會查詢所設定的 DNS 伺服器。
   * 通常由 DHCP 自動分配，或手動設定在網路介面中。
   * DNS 查詢順序依照網路設定與 DNS client 行為決定。
   * 可用 `nslookup` 或 `Resolve-DnsName` 測試解析結果。

4. ### **NetBIOS 名稱解析（僅限區域網路）**

   * 如果 DNS 無法解析，且系統啟用 NetBIOS over TCP/IP，會透過以下方式解析：

     * **NetBIOS Cache**
     * **WINS Server（若有設定）**
     * **廣播（Broadcast）**
   * 常見於舊式 Windows 網路或工作群組環境中。

5. ### **LLMNR（Link-Local Multicast Name Resolution）**

   * 在 Windows Vista 以後支援，當上面方法都失敗，系統會嘗試透過 LLMNR 進行區網內解析。
   * 適用於 DNS 與 NetBIOS 都失敗的情況。

6. ### **mDNS（Multicast DNS）**

   * Windows 10 以後在某些情境下支援，主要用於 `.local` 網域名稱，如 Bonjour 服務（Apple 使用）。

---

### 📝 總結（流程圖式）

```text
主機名稱解析流程：
 ↓
[DNS 快取] →
[hosts 檔案] →
[DNS 伺服器] →
[NetBIOS] →
[LLMNR] →
[mDNS]
```

---

### 📌 補充指令與工具

| 工具 / 指令                   | 用途            |
| ------------------------- | ------------- |
| `ipconfig /flushdns`      | 清除 DNS 快取     |
| `ipconfig /displaydns`    | 查看 DNS 快取     |
| `nslookup <主機名稱>`         | 測試 DNS 解析     |
| `ping <主機名稱>`             | 測試名稱是否能解析與可達性 |
| `net view` / `nbtstat -n` | NetBIOS 名稱查詢  |
| `Get-Host`（PowerShell）    | 查看主機名稱        |


---

# Web Proxy Auto-Discovery Protocol

---

# DNS Server DB

## Record
## SOA
## NS
## A
## CNAME
## MX

---

## Canonical

In the context of DNS (Domain Name System), **"canonical"** refers to the **true or official name** of a domain.

### Canonical Name in DNS

The term is most commonly seen in the context of **CNAME records**, where it stands for **Canonical Name**.

### 🔹 CNAME (Canonical Name) Record

A **CNAME record** is a type of DNS record ==that maps an alias name to the **canonical (true) domain name**.==

#### Example:

Let's say you have:

```
www.example.com   CNAME   example.com
```

This means:

* `www.example.com` is an **alias**.
==* The **canonical name** (true, primary domain) is `example.com`.==

So when someone accesses `www.example.com`, DNS will resolve it to `example.com`, and then resolve `example.com` to its IP address using an A or AAAA record.

### 🔍 Why Use CNAMEs?

* To point multiple subdomains to a single domain.
* To manage domains more easily (centralized configuration).
* To alias services like `blog.example.com` → `sites.google.com/myblog`.

### 🔒 Note:

A **CNAME record** must always point to a **domain name**, not an IP address.

### ✅ Summary

* **Canonical** means the **real/original/true domain name**.
* Used in **CNAME** records to define aliases.
* Helps simplify and centralize DNS management.

---
