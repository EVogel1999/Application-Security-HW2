#define __KERNEL__
#define MODULE

#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/netfilter.h>
#include <linux/netfilter_ipv4.h>
#include <linux/ip.h>
#include <linux/tcp.h>
#include <linux/udp.h>
#include <linux/inet.h>
#include <linux/net.h>

static struct nf_hook_ops nfho;

unsigned int hook_func(
    void *priv,
    struct sk_buff *skb,
    const struct nf_hook_state *state
) {
    struct iphdr *iph;
    char source[16];

    if (skb) {
        // Get IP header and save source address to char buffer
        iph = ip_hdr(skb);
        snprintf(source, 16, "%pI4", &iph->saddr);

        // Check if IP is equal to google
        if (strncmp(source, "142.251.45.14", 16) == 0) {
            printk(KERN_INFO "firewall_d.c -- Dropping packets from Google...\n");
            return NF_DROP;
        }
    }

    return NF_ACCEPT;
}

int init_module() {
    nfho.hook = hook_func; 
    nfho.hooknum = NF_INET_PRE_ROUTING;
    nfho.pf = PF_INET;
    nfho.priority = NF_IP_PRI_FIRST;
    nf_register_hook(&nfho);
  
    printk(KERN_DEBUG "firewall_d.c -- Module loaded\n");  
    return 0;
}

void cleanup_module() {
    nf_unregister_hook(&nfho);
    printk(KERN_DEBUG "firewall_d.c -- Module unloaded\n");
}