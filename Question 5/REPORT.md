# Question 5

Question 5 had us writing C code to configure firewalls using the netfilter package.  There were four different parts to this question.

Note that the make file used is the one that was used in the Firewall Lab.

## Part A

The goal of Part A was to configure a firewall that would only block TelNet traffic.  After doing some research online, I learned that TelNet uses the TCP and UDP protocols on specifically port 23.  I used the lab code as an example to make the [firewall_a.c](./firewall_a.c) code and modified the port to only check for port 23 (after checking for the appropriate protocol).

The code was compiled and installed by navigating to this directory in the terminal and running the following commands:

```
$ make args="firewall_a"
$ sudo insmod firewall_a.ko
```

To ensure that it was installed I ran the following command to check for the module initiated message:

```
$ tail /var/log/syslog
```

After that I opened another terminal and ran the following command to check if the firewall executed properly:

```
$ telnet localhost 23
```

Screenshot:
![Firewall A - TelNet Command](./img/a%20-%20telnet%20command.png)

Prior to the installing of the kernel module, the command would prompt me for the machine user and password.  When the firewall was active, however, the command could not execute.  Looking at the system logs showed that the firewall was blocking the connection.

Screenshot:
![Firewall A - System Log](./img/a%20-%20system%20log.png)

Lastly, the firewall was uninstalled by running the following:

```
$ sudo rmmod firewall_a.ko
```

## Part B

The goal of Part B was to configure a firewall that would block UDP packets that are on port greater than 2500.  I used the lab code as an example to make the [firewall_b.c](./firewall_b.c) code and modified the port check to be greater than 2500 instead of equal to a specific port.

The code was compiled and installed by navigating to this directory in the terminal and running the following commands:

```
$ make args="firewall_b"
$ sudo insmod firewall_b.ko
```

To ensure that it was installed I ran the following command to check for the module initiated message:

```
$ tail /var/log/syslog
```

To test this firewall, I opened the browser to a URL that I had not previously loaded.  I noticed while doing Part C that on initial load to a site a UDP packet is sent on a port > 2500, hence why I did it this way.  After navigating to the site in the browser (which failed to load because of the firewall blocking the packet), I ran the tail command (see above) to check the system logs.

Screenshot:
![Firewall B - System Log](./img/b%20-%20system%20log.png)

The firewall had been dropping packets with port > 2500.

Lastly, the firewall was uninstalled by running the following:

```
$ sudo rmmod firewall_b.ko
```

## Part C

The goal of Part C was to configure a firewall that would allow only web traffic and reject everything else.  I modified the lab code to accomplish this (the one where we block only web traffic) to make the [firewall_c.c](./firewall_c.c) code.

The code was compiled and installed by navigating to this directory in the terminal and running the following commands:

```
$ make args="firewall_c"
$ sudo insmod firewall_c.ko
```

To ensure that it was installed I ran the following command to check for the module initiated message:

```
$ tail /var/log/syslog
```

To test the firewall, prior to installation I had already loaded a website in the browser, to avoid the issue found in Part B with dropping UDP packets.  After installation I reloaded the page and it loaded without issue.  I checked the system logs to also make sure that the packets were being accepted.

Screenshot:
![Firewall C - System Log Resolved Host](./img/c%20-%20system%20log%20resolved%20host.png)

To test if it blocked all other requests I ran the following command in another terminal, which resulted in an unresolved host:

```
$ ping google.com
```

Screenshot:
![Firewall C - Ping](./img/c%20-%20ping.png)

Checking the system logs again I saw that it was blocking the ping request.

Screenshot:
![Firewall C - System Log Ping](./img/c%20-%20system%20log%20ping.png)

Lastly, the firewall was uninstalled by running the following:

```
$ sudo rmmod firewall_c.ko
```

## Part D

The goal of Part D was to configure a firewall that would block traffic from a specific domain and accept everything else.  Unlike the other parts, I only used a small portion of the lab code as a boilerplate to make the [firewall_d.c](./firewall_d.c) file.  After doing some research online, I found that to get the IP address from a buffer, you first need to create the IP Header and then access the senders address through the following ```iph->saddr```.  This can then be copied through a ```snprintf(...)``` function to a character buffer and then compared to by using ```strncmp(...)```.  For this firewall, I blocked an IP used by google.com which was "142.251.45.14".

The code was compiled and installed by navigating to this directory in the terminal and running the following commands:

```
$ make args="firewall_d"
$ sudo insmod firewall_d.ko
```

To ensure that it was installed I ran the following command to check for the module initiated message:

```
$ tail /var/log/syslog
```

To test the firewall, I pinged the domain by running the following command in the terminal:

```
$ ping google.com
```

This resulted in zero packets being returned to my user because they are dropped after my VM makes the request.  Meaning traffic to google.com isn't blocked but responses from google.com are.

Screenshot:
![Firewall D - Ping](./img/d%20-%20ping.png)

To verify the packets were dropped I checked the system logs.

Screenshot:
![Firewall D - System Log](./img/d%20-%20system%20log.png)

Lastly, the firewall was uninstalled by running the following:

```
$ sudo rmmod firewall_d.ko
```