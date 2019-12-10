---
title: Getting Started with Cost Optimization on AWS
date: 2019-12-10T16:25:10.058Z
description: This post will go over the basics of cost optimization in the cloud, and how to save money when using AWS. It also contains an overview of related releases from re:Invent 2019.
---

## Prologue

I'm a long-time user of AWS, and have been a cloud computing advocate for quite some time. However, it seems to me like cost optimization is a part of cloud computing which doesn't get the attention it deserves. As I'm going to speak at [AWS Community Day Tel Aviv](https://awscommunitydaytelaviv2019.splashthat.com) about it, I also wanted to write a blogpost on the subject.

This article will be an introduction to cost optimization (focused on AWS, as that's the cloud provider I'm most familiar with), with the end goal being to give you some inspiration on how you can look differently at your own cloud bills and cut down on costs.


## The Five Pillars

According to the [AWS documentation](https://docs.aws.amazon.com/whitepapers/latest/cost-optimization-laying-the-foundation/cost-optimization-pillars.html), there are five general cost optimization pillars:

- Right size
- Increase elasticity
- Leverage the right pricing model
- Optimize storage
- Measure, monitor, and improve

Here, I chose to focus on the three pillars which I think are the most important to be familiar with.

### Right size

I'd recommend you to read Corey Quinn's blogpost on the topic, ["Right Sizing Your Instances Is Nonsense"](https://www.lastweekinaws.com/blog/right-sizing-your-instances-is-nonsense/). Basically, your future needs when it comes to instance types are often unpredictable, and so you should choose a configuration that works for now and change it as necessary instead of opting for a specific instance type and commit to that. While this approach may sound a bit contradictory to AWS' suggestion, it will enable you to be more flexible when working with the cloud, and react quickly to changes in your computing needs.

### Leverage the right pricing model

Using [spot instances](https://aws.amazon.com/ec2/spot) and [Savings Plans](https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html), you can significantly cut down on EC2 costs for predictable as well as spontaneous compute needs.

If you need as much flexibility as possible, the [Compute Savings Plans](https://aws.amazon.com/blogs/aws/new-savings-plans-for-aws-compute-services) are the best option available, and they to apply Fargate in addition to EC2. See [the pricing page](https://aws.amazon.com/savingsplans/pricing) for more info.

| | Compute Savings Plan | EC2 Instance Savings Plan |
| --- | --- | --- |
| <b>Term<b> | 1 Year or 3 Year |
| <b>Platform/OS Flexibility</b>  | Yes |
| <b>Tenancy Flexibility (Shared vs Dedicated)</b> | Yes |
| <b>Regional availability</b> | All, except mainland China. Yes, that means GovCloud too! |
| <b>Overage charges</b> | Spend above your commit is charged at on-demand rates |
| <b>Region-specific</b> | No | Yes |
| <b>Instance-specific</b> | No | Yes |
| <b>Purchase Options</b> | No upfront, partial upfront, and all upfront |
| <b>Discount</b> | Up to 66% | Up to 72% |
| <b>Supports Fargate</b> | Yes | No |

_Source: [Corey Quinn's post blogpost on Savings Plans](https://www.lastweekinaws.com/blog/aws-begins-sunsetting-ris-replaces-them-with-something-much-much-better)._

Another alternative for EC2 is using [reserved](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html) instances, which are less flexible than the Savings Plans AWS offers, and aren't much cheaper either ([this article](https://www.gorillastack.com/news/aws-savings-plans-reserved-instances) contains a nice comparison of the two options).

### Measure, monitor, and improve

This means different things to different companies and organizations, but in general, you want to regularly go over your cloud bills and be aware of what you're spending money on. In countless times, the bill will show that by simply turning off unused EC2 instances, you can save a large percentage of the bill.

One useful monitoring tool is [AWS Budgets](https://aws.amazon.com/aws-cost-management/aws-budgets), which is built into the AWS Billing Dashboard and allows you to easily set your budget and be alerted when the current bill is exceeding your budget, or when it's predicted to do so.

Note that I'm mainly focused on compute costs in this blogpost since those are usually the most significant expenses users face.

---

## Updates from re:Invent 2019

### Compute Optimizer

One of the most exciting releases from re:Invent 2019 (in my opinion) is the [AWS Compute Optimizer](https://aws.amazon.com/compute-optimizer). I've already talked about right-sizing instances and impractical it is, however Compute Optimizer changes a few things.
<br>
Compute Optimizer analyzes your compute workloads, and uses machine learning to process historical utilization metrics and offer recommendations which are predicted to reduce costs and improve performance.

Corey Quinn already wrote a [whole blogpost on this](https://www.lastweekinaws.com/blog/with-compute-optimizer-aws-finds-an-actual-use-for-ai-ml), which I definitely recommend checking out. You can also read more about Compute Optimizer on the [AWS News Blog](https://aws.amazon.com/blogs/aws/aws-compute-optimizer-your-customized-resource-optimization-service).

### Fargate Spot

Another important announcement is [Fargate Spot](https://aws.amazon.com/blogs/aws/aws-fargate-spot-now-generally-available), which basically means that you can now configure your Fargate cluster to use Spot instances when those are available, or use regular EC2 containers otherwise. Using Fargate Spot will enable users to save up to 70% (when compared to using a regular Fargate cluster). Combined with Compute Savings Plans, you can drastically cut down on Fargate costs, without compromising flexibility or elasticity.

---


## Conclusion

I personally think that cost optimization is less about cutting down on costs wherever possible, and more about using the right tool for the right job _(while remembering to shut down unused EC2 instances)_. Plan for the future, leave room for as much flexibility as possible, and continuously adapt your cloud usage to your needs as you go.

***Big thanks to Corey Quinn for being a great resource on cloud cost optimization and inspiring me to dive into the topic.***
