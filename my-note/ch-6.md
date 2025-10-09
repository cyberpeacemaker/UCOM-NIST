# what is WWW

“WWW” stands for **World Wide Web**. It’s a system of interlinked web pages and multimedia content that you access via the internet using a web browser.

Here’s a quick breakdown:

* **World Wide Web (WWW):** A collection of websites and web pages linked together through hyperlinks.
* It uses the **HTTP** or **HTTPS** protocols to transmit data.
* When you type a web address starting with “www,” you’re usually accessing a website that’s part of the World Wide Web.

# Hwat is LAMP

**LAMP** is a popular stack of open-source software used to run **web servers** and host **dynamic websites or web applications**.

### LAMP stands for:

* **L**inux – the operating system
* **A**pache – the web server software
* **M**ySQL / MariaDB – the database management system
* **P**HP (or sometimes Python/Perl) – the server-side scripting language


### How LAMP Works Together:

1. **Linux** is the base OS that everything else runs on.
2. **Apache** handles HTTP requests and serves web pages to users' browsers.
3. **MySQL/MariaDB** stores the website's data (like user info, blog posts, etc.).
4. **PHP** runs scripts on the server to generate dynamic content (e.g., pulling blog posts from the database to display them).

### Example:

Imagine a blog site:

* You open `myblog.com`
* **Apache** receives that request
* **PHP** runs the code to fetch the latest posts from **MySQL**
* The content is sent back to the browser as HTML

---

# What is dynamic port

A **dynamic port** (also called an **ephemeral port**) is a **temporary network port** used by computers for short-lived communications, typically on the client side of a client-server connection.


## 🔧 **Key Characteristics of Dynamic Ports:**

* **Assigned automatically** by the operating system.
* **Used temporarily** for outbound connections (like when your browser connects to a website).
* **Range:** Typically from **49152 to 65535** (depends on OS).

## 🖥️ Example Scenario:

Suppose your computer connects to a website like `example.com`:

* Your machine acts as the **client**, and the website's server listens on **port 80** (HTTP).
* Your computer opens a **dynamic port**, e.g., **port 52034**, to send and receive data for that session.
* After the session ends, that dynamic port is closed and may be reused later.

## 🎯 Purpose:

* **Supports many simultaneous connections** from the same device.
* Keeps the **well-known ports** (0–1023) and **registered ports** (1024–49151) available for servers and services.

## 🔒 Security Note:

Dynamic ports are **not exposed** to the internet in most cases. They're temporary and usually handled behind NAT/firewalls.

---

# 🔄 well-known ports and registered ports Comparison:

| Feature             | Well-Known Ports         | Registered Ports          |
| ------------------- | ------------------------ | ------------------------- |
| **Range**           | 0–1023                   | 1024–49151                |
| **Assigned by**     | IANA (strictly reserved) | IANA (less strict)        |
| **Used for**        | Core internet protocols  | User/application services |
| **Access required** | Admin/root               | Regular user              |

---

# CIDR Prefix

**prefix**" — in networking, it's usually short for **network prefix** or **CIDR notation**.

### ✍️ CIDR Notation:

Instead of writing the full netmask, we often use **CIDR (Classless Inter-Domain Routing)** notation, like this:

---

# Socket

A **socket** is a ==**software endpoint**== that enables communication between two devices (or processes) over a **network**.

A **socket** is like a **virtual plug** that allows programs to send or receive data over a network — like a phone line between two apps or computers.

## 📦 A socket includes:

* An **IP address** (identifies the device)
* A **port number** (identifies the application/service)

Together, they form a unique connection point:

```
Socket = IP address + Port number
```

Example:

```
192.168.1.100:80 → a web server socket on port 80
```


## 📡 How It Works:

==1. A **server** creates a socket and “listens” on a port (e.g., port 80 for HTTP).==
==2. A **client** creates a socket and connects to the server’s IP and port.==
3. They exchange data (e.g., web page data).
4. When done, the sockets are closed.

## 🔄 Summary:

| Term        | Description                                  |
| ----------- | -------------------------------------------- |
| **Socket**  | Software interface for network communication |
| **IP**      | Identifies device                            |
| **Port**    | Identifies application/service on the device |
| **TCP/UDP** | Protocol used by the socket                  |

---

In the context of **web development** or **web servers**, the term **`bind`** refers to the process of **associating a server (or socket) with a specific IP address and port number**, so that it can **listen for incoming connections**.

---

# 🔧 What is `bind`?

To **bind** means:

==> "Tell the server to listen on this IP address and port number for incoming client connections."==

It’s a fundamental step in setting up a **web server** or **network service**.

---

# `whoami` command

The `whoami` command is a simple and commonly used command in Unix-like operating systems (like Linux and macOS). It displays the **username of the current user** who is executing the command.

### Example:

```bash
$ whoami
john
```

---

# What is DLL

A **DLL** (Dynamic Link Library) is a file used in **Windows operating systems** that contains code and data that can be used by multiple programs at the same time.

### Key Points:

* **File extension**: `.dll`
* **Purpose**: To share functions, classes, and resources (like icons) among programs.
* **Benefits**:

  * Saves memory by sharing code.
  * Makes programs modular and easier to update.

## Common DLL-based attack techniques (high level)

I’ll describe the techniques conceptually (no exploit steps or code):

* **DLL search-order hijacking (DLL preloading / side‑loading)**
  Windows locates DLLs by searching a set of directories (application directory, system directories, PATH, etc.). If a vulnerable application loads a DLL by name without a full path, an attacker who can place a malicious DLL in an earlier-searched location can get it loaded. This is commonly abused when apps load third-party DLLs from their working directory.

* **Proxying / DLL replacement**
  An attacker drops a malicious DLL that implements the same exported names as an expected DLL. The app loads the attacker’s DLL (either due to search order or because the original was replaced), and the malicious code runs — often calling through to the original implementation to avoid breaking functionality.

* **DLL sideloading using signed binaries**
  Some signed executables will load DLLs from their directory. Attackers drop a malicious DLL next to a signed executable and run it — the signed exe launches and loads the malicious DLL. This leverages a trusted signed binary to get code executed.

* **DLL injection**
  **Forcing a process to load a DLL (or map code into its address space) so code runs in the context of that process.** Techniques vary (APIs exist that facilitate remote-thread creation or hooking) — attackers use injection for stealth, credential theft, or to manipulate process behavior.

* **Reflective/loading-from-memory**
  Rather than touching disk, **malware may map a DLL image into memory and run it directly to avoid file-based detection.** This reduces forensic artifacts on disk.

* **Abuse of legitimate DLLs (living-off-the-land)**
  Attackers may use legitimate DLLs (or legitimate signed software that can load plugins) as a vector by abusing their features to execute malicious payloads.

  # Typical targets

* Applications with writeable install directories or working directories that are user-writable.
* Signed utilities that load local DLLs.
* Services and scheduled tasks that run with elevated privileges.
* Browsers, Office apps, and other high-privilege processes where in-process code is especially valuable.

---

# 🌱 **Environment Variables – A Short Intro**

**Environment variables** are key-value pairs used by the operating system to **configure and control the behavior of processes and applications**. They provide information like system paths, user settings, or runtime configurations.

## 🔧 **Default/System Environment Variables**

These are **predefined variables** set by the operating system. They are available to all users and processes. Examples include:

* `PATH` – Directories to search for executable files.
* `HOME` (Linux/macOS) / `USERPROFILE` (Windows) – The user's home directory.
* `OS` – The operating system name.
* `TEMP` or `TMP` – Directory for temporary files.
* `USERNAME` – The current logged-in user.

## 📍Example (Windows):

```cmd
echo %USERNAME%
```

To **show all system default environment variables**, it depends on your operating system:

### On **Windows** (Command Prompt):

```cmd
set
```
