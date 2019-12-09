---
title: Getting Started with Cost Optimization on AWS
date: 2019-12-09T17:23:43.363Z
description: An introductory post going over the basics of cost optimization in the cloud, and how to save money when using AWS.
---

## Prologue

I'm a long-time user of AWS, and have been a cloud computing advocate for quite some time. However, it seems to me like cost optimization is a part of cloud computing which doesn't get the attention it deserves. As I'm going to speak at [AWS Community Day Tel Aviv](https://awscommunitydaytelaviv2019.splashthat.com) about it, I also wanted to write a blogpost on the topic.

This article will be an introduction to the subject of cost optimization (focused on AWS, as that's the cloud provider I'm most familiar with), with the end goal being to give you some inspiration on how you can look differently at your own cloud bills and cut down on costs.

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

If you need as much flexibility as possible, the Compute Savings Plans are the best option available, and they to apply Fargate in addition to EC2. See [the pricing page](https://aws.amazon.com/savingsplans/pricing) for more info.

_<Insert chart comparing sample pricing on on-demand, Savings Plans, and spot instances>_

Another alternative for EC2 is using [reserved](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html) instances, which are less flexible than the Savings Plans AWS offers, and aren't much cheaper either ([this article](https://www.gorillastack.com/news/aws-savings-plans-reserved-instances) contains a nice comparison of the two options).

### Measure, monitor, and improve

This means different things to different companies and organizations, but in general, you want to regularly go over your cloud bills and be aware of what you're spending money on. In countless times, the bill will show that by simply turning off unused EC2 instances, you can save a large percentage of the bill.

One useful monitoring tool is [AWS Budgets](https://aws.amazon.com/aws-cost-management/aws-budgets), which is built into the AWS Billing Dashboard and allows you to easily set your budget and be alerted when the current bill is exceeding your budget, or when it's predicted to do so.

## Updates from re:Invent 2019

## Compute Optimizer

One of the most exciting releases from re:Invent 2019 (in my opinion) is the [AWS Compute Optimizer](https://aws.amazon.com/compute-optimizer). I've already talked about right-sizing instances and impractical it is, however Compute Optimizer changes a few things.
<br>
Compute Optimizer analyzes your compute workloads, and uses machine learning to process historical utilization metrics and offer recommendations which are predicted to reduce costs and improve performance.

Corey Quinn already wrote a [whole blogpost on this](https://www.lastweekinaws.com/blog/with-compute-optimizer-aws-finds-an-actual-use-for-ai-ml), which I definitely recommend checking out. You can also read more about Compute Optimizer on the [AWS News Blog](https://aws.amazon.com/blogs/aws/aws-compute-optimizer-your-customized-resource-optimization-service).
