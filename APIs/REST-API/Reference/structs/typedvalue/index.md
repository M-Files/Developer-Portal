---
layout: mfws
title: TypedValue
includeInSearch: true
redirect_from: "/APIs/REST-API/Reference/structs/typedvalue.html"
---

# TypedValue

A 'typed value' represents a value, such as text, number, date or lookup item. 

## Properties

{:.struct.table}
Type | Name | Description
--- | --- | ---
[MFDataType](../../enumerations/mfdatatype/) | DataType | Specifies the type of the value. 
`bool` | HasValue | Specifies whether the typed value contains a real value. 
`object` | Value | Specifies the string, number or boolean value when the `DataType` is not a lookup type. 
[Lookup](../lookup/) | Lookup | Specifies the lookup value when the `DataType` is Lookup. 
[Lookup[]](../lookup/) | Lookups | Specifies the collection of [Lookup](../lookup/)s when the `DataType` is MultiSelectLookup. 
`string` | DisplayValue | Provides the value formatted for display. 
`string` | SortingKey | Provides a key that can be used to sort [TypedValues](.) 
`string` | SerializedValue | Provides the typed value in a serialized format suitable to be used in URIs. 

This is related to [the TypedValue class](https://www.m-files.com/api/documentation/latest/index.html#MFilesAPI~TypedValue.html) in the COM API.
{:.remark}