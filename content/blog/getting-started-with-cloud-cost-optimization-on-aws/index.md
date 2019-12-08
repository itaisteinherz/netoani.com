---
title: Getting Started with Cost Optimization on AWS
date: 2019-11-23T18:57:27.772Z
description: An introductory post going over the basics of cost optimization in the cloud, and how to save money when using AWS.
---

## Prologue

I'm a long-time user of AWS, and have been a fan of cloud computing for quite some time. I also like attending technical meetups and conferences, and wanted to start giving talks myself.
<br>
As an excuse to learn more about the cloud, I submitted a proposal on cost optimization to the local [AWS Community Day](https://awscommunitydaytelaviv2019.splashthat.com) CFP. The proposal was accepted to the conference, and so now all that's left is to learn what cost optimization is about 😅

This article will be an introduction to the subject of cost optimization (with a focus on AWS, as that's the cloud provider I'm most familiar with), with the end goal being to give you some inspiration on how you can look differently at your own cloud bills and cut costs.

## The Five Pillars

According to [the AWS documentation](https://docs.aws.amazon.com/whitepapers/latest/cost-optimization-laying-the-foundation/cost-optimization-pillars.html), there are five general cost optimization pillars: right size, increase elasticity, leverage the right pricing model, optimize storage, and measure, monitor, and improve.

Some of the pillars are pretty much self-explanatory, but I'll expand on some important aspects of those.

### Right size

I'd recommend you to read Corey Quinn's blogpost on the topic, ["Right Sizing Your Instances Is Nonsense"](https://www.lastweekinaws.com/blog/right-sizing-your-instances-is-nonsense/). Basically, your future needs when it comes to instance types are often unpredictable, and so you should choose a configuration that works for now and change it as necessary instead of opting for a specific instance type and commit to that.

### Leverage the right pricing model

Using [spot](https://aws.amazon.com/ec2/spot/) and [reserved](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html) instances, you can significantly cut down on EC2 costs for predictable as well as spontaneous compute needs.

_<Insert chart comparing sample pricing on on-demand, RI, and spot instances>_

Another alternative option for EC2 is buying [Savings Plans](https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html), which are [more flexible than reserved instances](https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html#sp-ris).

_<Insert costs table inspired by https://www.gorillastack.com/news/aws-savings-plans-reserved-instances/>_

As you can tell from the above table, you may save more by using reserved instances, but choosing to use RIs requires you to commit to a fixed configuration, which is not always desirable. Savings Plans allow you to save _nearly_ as much, **without sacrificing any of the flexibility** you'd get by using on-demand EC2 instances.

### Measure, monitor, and improve

This means different things to different companies and organizations, but in general, you want to regularly go over your cloud bills and be aware of what you're spending money on. In countless times, the bill will show that by simply turning off unused EC2 instances, you can save a large percentage of the bill.
