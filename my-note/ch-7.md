# Tabnabbing

**Tabnabbing** is a type of **phishing attack** where a **malicious website changes its appearance after being left idle in an open browser tab**, often to mimic a trusted login page (like Gmail, Facebook, or a bank). The goal is to **trick users into entering their login credentials**, thinking they've returned to the legitimate site.

### 🔍 How Tabnabbing Works:

1. **You visit a malicious website** — it may appear harmless at first.
2. **You switch to another tab**, leaving the malicious one open in the background.
3. After some time, **the malicious tab detects that it’s no longer active**.
4. It **automatically changes its content** (using JavaScript or meta refresh) to look like a login page for a legitimate site (e.g., Google).
5. When you return to the tab, you might think your session expired and **enter your credentials**, unknowingly sending them to the attacker.

---

# **Digital Certification – Introduction**

A **digital certification** is an electronic way to prove identity and ensure secure communication over the internet. It is like a digital ID card issued by a trusted authority, called a **Certificate Authority (CA)**. Digital certificates are used in various applications, such as securing websites (HTTPS), sending encrypted emails, and verifying software authenticity.

Each digital certificate contains important information, including the user's name, a public key, the certificate's expiration date, and the CA's digital signature. By using digital certificates, individuals and organizations can build trust online and protect their data from unauthorized access.

---

# Self-Signed Certificate

A **self-signed certificate** is a digital certificate that is **created and signed by the same person or organization** — instead of a trusted third-party Certificate Authority (CA). It is commonly used for internal testing, development, or private networks.

#### **Steps to Issue a Self-Signed Certificate:**

1. **Generate a Private Key**
   This key is kept secret and is used to sign the certificate.

2. **Create a Certificate Signing Request (CSR)** *(optional)*
   This includes information like domain name, organization, and public key.

3. **Create the Self-Signed Certificate**
   Use the private key to sign the certificate. This links your identity to the public key.

4. **Install the Certificate**
   Add the certificate to your server or application to enable secure communication (like HTTPS).

* **Not trusted by browsers by default** (users may see a warning)
* **Should not be used for public websites**

---

# C:\Windows\System32\CertLog

`C:\Windows\System32\CertLog` is a system directory used by Windows Certificate Services (specifically Active Directory Certificate Services - AD CS) to store certificate-related log files and database transaction logs. These logs help track changes, requests, and operations related to digital certificates issued or managed by the Certificate Authority (CA) installed on the server.

---

# certsrv

`certsrv` is the core Windows service for **Active Directory Certificate Services (AD CS)** — Microsoft's implementation of a **Certificate Authority (CA)**. It is responsible for issuing, managing, and revoking digital certificates within a Windows environment.

* **Service Name**: `CertSvc` (shown as **Active Directory Certificate Services** in the Services console).
* **Executable Path**: Typically runs under `C:\Windows\System32\certsrv.exe`.
* **Primary Role**: Issues and manages X.509 digital certificates for secure communication (e.g., SSL/TLS, smart card logins, email encryption, etc.).
* **Web Interface**: When installed, AD CS can expose a web enrollment interface at `http://<servername>/certsrv` for users and computers to request or download certificates.
* **Backed by CertLog**: Certificate logs and transaction logs are stored in `C:\Windows\System32\CertLog`.

### Typical Usage Scenarios:

* Deploying **internal PKI** for secure communications.
* **Smart card logon** and authentication.
* **Encrypting File System (EFS)** and **S/MIME** email encryption.
* Issuing certificates for **VPN**, **Wi-Fi**, and **web servers** (IIS/HTTPS).
