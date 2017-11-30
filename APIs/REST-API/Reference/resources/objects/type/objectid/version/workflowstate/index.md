---
layout: mfws
title: Object workflow state
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/resources/objects/type/objectid/version/workflowstate.html"
---

# Object workflow state

## /objects/(type)/(objectid)/(version)/workflowstate
{:.url-with-parameters}

Resource representing the object workflow state. 
{:.description}

### Methods

### GET
{:.method}

{:.method}
Output: | [ObjectWorkflowState]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objectworkflowstate/)
| Retrieves the current workflow state.

### PUT
{:.method}

Note that PUT and DELETE verbs may not be supported in IIS; it is recommended to route them via the POST verb and specify the _method, as [detailed in the compatibility page]({{ site.baseurl }}/APIs/REST-API/Reference/compatibility/#http-methods).
{:.remark}

{:.method}
Input: | [ObjectWorkflowState]({{ site.baseurl }}/APIs/REST-API/Reference/structs/objectworkflowstate/)
Output: | [ExtendedObjectVersion]({{ site.baseurl }}/APIs/REST-API/Reference/structs/extendedobjectversion/)
| Sets the workflow state. 

If the object has an automatic title PUT will result in 401. 
{:.remark}
