---
layout: page
title: Using Pre-Shared Keys through the M-Files Web Service (REST API)
includeInSearch: true
breadcrumb: Pre-Shared Keys
---

This article discusses how to provide Pre-Shared Key information when using the M-Files Web Service.  Pre-Shared Key setup and configuration information can be found [in the M-Files Knowledgebase](https://kb.cloudvault.m-files.com/link.ashx?Action=Download&vault=3ECA226F-7B54-428B-B539-DE443E6134EC&objectGUID=1A27BE65-4C0B-4A78-9919-825A8E20635C&fileGUID=C0B87DAE-C30E-4337-A4B5-860EC729A9CD&ObjectVersion=-1).
{:.note}

When making requests to an instance of the M-Files Classic Web that has had a Pre-Shared Key requirement configured, the `X-PresharedKey` HTTP header must be added to **all** HTTP requests.  This header must be added in addition to other HTTP headers.
