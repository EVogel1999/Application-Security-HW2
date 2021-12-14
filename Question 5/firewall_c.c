#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/netfilter.h>
#include <linux/netfilter_ipv4.h>
#include <linux/ip.h>
#include <linux/tcp.h>
#include <linux/udp.h>

static struct nf_hook_ops nfho;

unsigned int hook_func(
    void *priv,
    struct sk_buff *skb,
    const struct nf_hook_state *state
) {
    struct iphdr *iph;
    struct tcphdr *tcph;
    struct udphdr *udph;
    u16 source_port = 0;
  
    if (skb) {
        // Get IP header from the socket buffer
        iph = ip_hdr(skb);

        if (iph && iph->protocol == 6) {
            // Typecast to tcphdr pointer
            tcph = (struct tcphdr *)((__u32 *)iph + iph->ihl);    
            if (tcph) {
                // Convert the source port to integer 16bits
                source_port = ntohs(tcph->source);
            }
            if (source_port == 80 || source_port == 443) {
	            printk(KERN_INFO "firewall_c.c -- Accepting TCP packets\n");
                return NF_ACCEPT;
            }
        }
        else if (iph && iph->protocol == 17) {
            // Typecast to udphdr pointer
            udph = (struct udphdr *)((__u32 *)iph + iph->ihl);

            if (udph) {
                // Convert the source port to integer 16bits
                source_port = ntohs(udph->source);
            }
            if (source_port == 80 || source_port == 443) {
	            printk(KERN_INFO "firewall_c.c -- Accepting UDP packets\n");
                return NF_ACCEPT;
            }
        }
    }
  
    printk(KERN_INFO "firewall_c.c -- Dropping packets\n");
    return NF_DROP;
}

int init_module() {
    nfho.hook = hook_func; 
    nfho.hooknum = NF_INET_PRE_ROUTING;
    nfho.pf = PF_INET;
    nfho.priority = NF_IP_PRI_FIRST;
    nf_register_hook(&nfho);
  
    printk(KERN_DEBUG "firewall_c.c -- Module loaded\n");  
    return 0;
}

void cleanup_module() {
    nf_unregister_hook(&nfho);
    printk(KERN_DEBUG "firewall_c.c -- Module unloaded\n");
}