# 數字系統
符號
底數(Base, Radix)
Position Value, Place Value

## 系統間轉換

TIPS 2轉16 可以4個一組

# 🔹 What is an IP Address?

An **IP address** is like a phone number for your device on a network. It’s a 32-bit number (in IPv4), usually shown as four numbers separated by dots (e.g., `192.168.1.10`).

唯一性 邏輯 識別符號 在網路世界中所註冊的一個絕對所在位置
透過這個位址的註冊 可以讓某一台主機找到另一台在TCP/IP網路上的主機

Dotted Decimal Notation

## 🔹 Network ID and Host ID

An IP address is divided into **two parts**:

| Part           | Description                                             |
| -------------- | ------------------------------------------------------- |
| **Network ID** | Identifies **which network** the IP address belongs to  |
| **Host ID**    | Identifies a **specific device** (host) on that network |

Network ID, Network Address, Network Segment
Host ID, Host Address

* **Routers** use the **Network ID** to send data to the correct network.
* Once it gets to the network, the **Host ID** is used to find the exact device.

## Subnet Mask

The subnet mask decides how much of the IP address is network vs. host.

Example masks:

* `255.0.0.0` → Class A (1st octet = network, rest = host)
* `255.255.0.0` → Class B (2 octets = network)
* `255.255.255.0` → Class C (3 octets = network)


## 🔹 What is an IP Class?

In the early days of the internet, IP addresses were divided into **five classes (A to E)** to support networks of various sizes:

| Class | First Octet | Subnet Mask   | Hosts per Network | Purpose            |
| ----- | ----------- | ------------- | ----------------- | ------------------ |
| A     | 1–126       | 255.0.0.0     | ~16 million       | Large networks     |
| B     | 128–191     | 255.255.0.0   | ~65,000           | Medium networks    |
| C     | 192–223     | 255.255.255.0 | 254               | Small networks     |
| D     | 224–239     | N/A           | Multicast         | Special use        |
| E     | 240–255     | N/A           | Experimental      | Not for public use |

> ❗ Note: `127.x.x.x` is reserved for loopback (e.g., `127.0.0.1` = localhost).
> ❗ Note: `0.x.x.x` is reserved

## ⚠️ Note: Classful IPs Are Outdated

Modern networks mostly use **CIDR (Classless Inter-Domain Routing)** instead of class-based IPs. CIDR allows **more flexible subnetting** without being restricted by classes.

---

# 🔹 What is CIDR?

**CIDR** stands for **Classless Inter-Domain Routing**, is a way of representing IP addresses and their associated network masks **without relying on traditional IP address classes (A, B, C)**. Instead, it uses **variable-length subnet masking (VLSM)**, which allows more flexible division of IP address space.

## 🔹 Format of CIDR Notation

CIDR notation uses the format:

```
<IP address>/<prefix length>
```

**Examples:**

* `192.168.0.0/24`
* `10.0.0.0/8`
* `172.16.5.128/25`

Here:

* The **IP address** identifies the network.
* The **prefix length** (`/24`, `/8`, etc.) tells you how many bits are used for the network portion of the address.


## 🔹 CIDR vs. Classful IP Addressing

| Feature               | Classful Addressing | CIDR Addressing                    |
| --------------------- | ------------------- | ---------------------------------- |
| Fixed address classes | Yes (A, B, C)       | No (Flexible prefixes)             |
| Subnet mask           | Implied by class    | Explicit with prefix (e.g., `/24`) |
| IP space usage        | Inefficient         | Efficient, reduces waste           |

---

### 🔹 CIDR and IP: The Relationship

1. **CIDR is applied to IP addresses**—both IPv4 and IPv6.
2. It defines how much of an IP address is for the **network** and how much is for **hosts**.
3. It enables efficient **IP address allocation** by ISPs and more scalable **routing** on the internet (route aggregation).

---

### 🔹 Example

Suppose you have:

```
192.168.1.0/24
```

* IP range: 192.168.1.0 to 192.168.1.255
* Usable hosts: 254 (excluding network & broadcast)
* Netmask: 255.255.255.0

If you instead use:

```
192.168.1.0/26
```

* IP range: 192.168.1.0 to 192.168.1.63
* Usable hosts: 62
* Netmask: 255.255.255.192

So, CIDR allows more **granular control** over IP ranges.

---

### 🔹 Why CIDR Matters

* Reduces **routing table size** (via route summarization)
* Supports **IP conservation** (important with IPv4 exhaustion)
* Enables **flexible subnetting** and network design

---

Let me know if you'd like to see how to calculate ranges or convert CIDR to subnet masks.



