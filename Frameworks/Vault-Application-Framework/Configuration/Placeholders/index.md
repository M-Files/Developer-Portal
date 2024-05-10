---
layout: page
title: Placeholders
includeInSearch: true
---

## Introduction

*Placeholders* are a simple templating system used by M-Files to generate text, and other values by referencing vault and object information and traversing object relationships.

Currently, placeholders are used by M-Files for notification templates, concatenated property values, and dynamic values in the Metadata Card configuration rules. They may also be used in VAF applications to generate texts, references and property values.

## Placeholder Basics

A placeholder begins and ends with a '%' (percent sign) and consists of one or more placeholder commands separated by periods '.'.
Zero or more placeholders can be interspersed with static text in a placeholder template string.

### Example: Template string with placeholders

```csharp
Hi %PROPERTY_{PD.Contact}%,

You have %OBJTYPE_10.COUNT% assignments:
%OBJTYPE_10.FOREACH%
    - %OBJTITLE%, Deadline: %PROPERTY_42%
%NEXT%
```

### Placeholder Commands

 Each placeholder command is an upper-case word consisting of alpha-numeric characters, and must begin with a letter*. Some commands may be used stand-alone, and others may allow or require a single argument. An argument is appended to a placeholder command with an underscore. An argument may be a single integer or text string.  Text arguments must be enclosed in curly braces '{}' and cannot contain spaces or other illegal characters (TBD). Integer arguments were originally inteded to specify the IDs of vault structure items, and text arguments intended to specific the aliases of value structure items, but they may find other limited uses.

 \* <sub>The one exception to the command format is the period %.% placeholder used for a "self" reference to the current context. It cannot be chained with other commands.</sub>

| Command Type   | Argument          | Example                        |
|----------------|-------------------|--------------------------------|
| Simple         | Simple            | VAULTNAME                      |
| Complex Digit  | Integer/Numeric   | PROPERTY_1234                  |
| Complex Curly  | Text/AlphaNumeric | PROPERTY_\{MyPropertyAlias\}   |

### Expansion Context

When resolving or *"expanding"* a placeholder's value, each command takes an expansion context as input, and transforms it into an output expansion context.  An expansion context consists of zero or more values of a certain data type. The first command in a placeholder receives the ambient or default context of the template or block, which is typically a single object version. That command's output is then passed to the next command in the chain until there are no more commands in the placeholder to process. The final command's output is the value of the placeholder.

Commands can only begin a placeholder if their accepted input contexts match the ambient context of the template, or if they don't take any input context at all.

Commands can only be chained when their accepted input context types are compatible with the output context of the command it is chained to it. All context types can be converted to text, and therefore any command that accepts text as an input can be chained to them if not otherwise restricted.

| Expansion Context Type   | Compatible MFDataType(s)    |  Description          |
|----------------|---------------------------|-----------------------|
| Undefined      | -                         | Unspecified or unkown, used when parameters have not been provided or resolved which can affect the output type.  |
| None           | -                         | No type. Used when defining accepted input types, indicates no context is needed for expansion. Used for static placeholder levels that should be standalone.  |
| Any            | -                         | Any type. Used when defining accepted input types. Cannot be used for output type.  |
| PassThrough    | -                         | Used when defining output types. Indicates the level outputs the same type it receives as input. |
| Object         | Lookup, MultiSelectLookup | Vault objects.  |
| Text           | Text, MultiLineText       | Text values.  |
| Integer        | Integer                   | Whole integer values. |
| Float          | Floating                  | Real number values.  |
| Boolean        | Boolean                   | Boolean values.  |
| Timestamp      | Timestamp                 | Timestamp values.  |
| Date           | Date                      | Date values.  |
| Time           | Time                      | Time-of-day values.  |
| ValueListItem  | Lookup, MultiSelectLookup | Vault value list items and objects.  |
| UserAccount    | Lookup, MultiSelectLookup | Vault user accounts.  |
| UserGroup      | Lookup, MultiSelectLookup | Vault user groups.  |
| File           | -                         | Object files.  |
| PropertyValue  | -                         | Property values of varying data types.  |

### Block Commands

Block commands are used to modify the ambient or default context used by other commands within a certain part or *"block"* of a template.  A block begins with a block-opening command, and closed by a block-closing command. The block-opening command controls how many times the block is processed and with what ambient context. 

Blocks can be nested. Blocks are automatically closed at the end of the template if no matching block-closing command is found. 

The `FOREACH` block-opening command and the corresponding block-closing `NEXT` command are currently the only built-in block commands.

The VAF's placeholder processor can handle all ambient context types, but the placeholder editor can only handle Object contexts, which means it may suggest available commands incorrectly if other ambient context types are used.

### Placeholder Processors

 Placeholder processors are used to resolve placeholder values within a template.  There are at least three different processors; one in MFServer one in VAF, and one in the Metadata Card.  

### Placeholder Editor

The Configurations section in MFiles Admin contains a placeholder editor to make it easier to define placeholder templates used in Advanced Vault Settings (notifications), Metadata Card Configuration (dynamic property value settings), and 3rd party applications (for example Compliance Kit).

The Placeholder provides the following conveniences:

 - Highlights the placeholders in bold amongst the plain, static text.
 - Hides most of the nuances of placeholder syntax including percent signs, underscores and curly braces.
 - Provides a drop down list of available command options that are compatible with the current context.
 - Dynamically generates options for placeholders with arguments.
 - Provides an easy way to select the desired reference types (alias, guid, id, etc...).
 - Formats option text to be more readable (less code-like).

### Placeholder Environments

 Which placeholders are available, how they work and can be used is called the placeholder environment, and is determined by the processor and what it is processing.  It is important that the placeholder editor is aware of the placeholder environment, so it does not suggest placeholders the processor will not or cannot evaluate.

## VAF Usage

 As of VAF version 23.10.699.0, the recommend way to declare and process placeholders has changed. The legacy pattern is still supported, so no code changes are required for upgrades, but the new approach is recommended, and is required to fully leverage custom placeholders.

### Recommended Usage

The new `PlaceholderTextEx` type should be used for declaring strings that will contain placeholder text in VAF versions >= 23.10.699.0.

`PlaceholderTextEx` was designed to replace the use of simple strings so we could improve editor support, explicitly declare which `PlaceholderEnvironment` (available placeholders and expansion settings) should be used with the template, and providing methods to resolve placeholder values with the intended environment and by passing the required context.

Configuration properties using `PlaceholderTextEx` or derivatives will automatically use the placeholder editor in M-Files Admin. Specifying the `TypeEditor="placeholderText"` on the property's JsonConfEditor attribute **should not be done (removed if present)** on this and derived types -- as it may override/preclude other necessary schema modifications provided by the type.

`PlaceholderTextEx` is  a wrapper for a string value.  The underly JSON in configuration will still be serialized as a simple string, and there are implicit conversion methods to/from a string.

```csharp
[DataContract]
public class Configuration
{
	/// <summary>
	/// Placeholder template using default settings and placeholder commands.
	/// </summary>
	[DataMember]
	public PlaceholderTextEx Template { get; set; }
}

// New way to expand placeholders using PlaceholderTextEx methods.
string text =  conf.Template.ExpandText( env.ObjVerEx );  // Expand to text.
ExpandedPlaceholderTemplate expTemplate =
		conf.Template.Expand( env.ObjVerEx );  // Expand to model.
```

### Legacy Usage

The following is an example of legacy placeholder text usage in VAF applications.  This format is required in versions prior to 23.10.699.0 but should be avoided in later versions. It uses the string type for declaring properties containing placeholder templates, and explicitly specifies `TypeEditor="placeholderText"` in the `JsonConfEditor` attribute.

```csharp
[DataContract]
public class Configuration
{
	/// <summary>
	/// Legacy Placeholder template property.
	/// </summary>
	/// <remarks>
	/// We can't tell which placeholder commands can be used,
	/// which settings should be used for expansion or if any extra
	/// context needs to be provided for the expansion.
	/// </remarks>
	[DataMember]
	[JsonConfEditor( TypeEditor = "placeholderText" )]
	public string Template { get; set; }
}

// Old way to expand placeholder template string, 
// using default environment and expansion settings.
string text = env.OjVerEx.ExpandPlaceholderText( conf.Template );  // Expand to text.
ExpandedPlaceholderTemplate expTemplate = 
		env.ObjVerEx.ExpandPlaceholders( conf.Template );  // Expand to model.
```

### Custom Placeholders

The VAF placeholder processor has always allowed for extension by defining custom placeholder commands, but there has never been a mechanism to communicate the available placeholder commands to the placeholder editor, severely limiting possible use-cases.

It is now possible for VAF versions >= 23.10.699.0 to communicate the commands available in a particular placeholder environment and the placeholder properties that use them to the Placeholder Editor in M-Files Admin versions >= 23.5.

Defining custom commands and custom environments are considered adavanced usage, and are covered in that section.

## Advanced Usage

### 1. Custom Placeholder Environment

The `PlaceholderEnvironment` may be derived to specify the desired placeholders and expansion settings, and then referenced as a generic type argument in `PlaceholderTextEx` to indicate where it is used.

In the example below, we create a custom environment that will Html escape any resolved placeholder values by default, and will also offer three new placeholders that can be used to expose information about the application that is expanding the template.

```csharp
public class MyPlaceholderEnvironment: PlaceholderEnvironment
{
	public virtual PlaceholderTemplateSettings GetSettings( TemplateContext context )
	{
		// Modify default settings.
		PlaceholderTemplateSettings settings = base.GetSettings( context );
		settings.DefaultEncoder = new EncodeHtmlPlaceholder();
		return settings;
	}	

	protected override CommandProviders GetCommandProviders( TemplateContext context )
	{
		// Get default command providers.
		CommandProviders providers = base.GetCommandProviders( context );

		// Add placeholders for application information.
		providers.AddRange(
			new StaticContextPlaceholderProvider( "APPNAME", "ApplicationName",
					new TextContext{ ApplicationDefinition.Name } ),
			new StaticContextPlaceholderProvider( "APPVER", "ApplicationVersion",
					new TextContext{ ApplicationDefinition.Version.ToString() } ),
			new StaticContextPlaceholderProvider( "APPGUID", "ApplicationID",
					new TextContext{ ApplicationDefinition.Guid.ToString( "B" ) } ) );

		return providers;
	}
}

[DataContract]
public class Configuration
{
	/// <summary>
	/// Placeholder template with my custom settings and placeholders.
	/// </summary>
	[DataMember]
	public PlaceholderTextEx<MyPlaceholderEnvironment> Template { get; set; }
}


// The new expansion calls no longer need to be aware of the correct settings or placeholders
// they are already defined in the Template's type and will be used automatically.
string text =  conf.Template.ExpandText( env.ObjVerEx );
ExpandedPlaceholderTemplate expTemplate = conf.Template.Expand( env.ObjVerEx );
```

### 2. Custom Placeholder Environment with Custom Context

The `PlaceholderEnvironment` associated with a `PlaceholderTextEx` is declared at code/compile time, but there are times when the values that a placeholder should resolve to are determined at runtime. The TemplateContext is already used to pass in the Vault and the initial ObjVer, but can be extended to include extra context.

For the next example, assume we'd like to include information about the user that is expanding the template and we'd also like to include additional information about the user via an associated Employee object, if available.

```csharp

/// <summary>
/// Custom context for providing current user/employee to use when expanding placeholders.
/// </summary>
public class CurrentUserContext : TemplateContext
{
	public int? CurrentUserId { get; set; }

	public ObjVerEx CurrentEmployee { get; set; }

	public static CurrentUserContext Create(
		EventHandlerEnvironment env,
		MFIdentifier employeeObjType,
		MFIdentifier userPropDef,
	)
	{
		return new CurrentUserContext()
		{
			Vault = env.Vault,
			Target = env.ObjVerEx,
			CurrentUserId = env.CurrentUserID,
			CurrentEmployee = new MFSearchBuilder( env.Vault )
					.ObjType( employeeObjType )
					.Property( userPropDef, MFDataType.MFDatatypeLookup, env.CurrentUserID )
					.FindOneEx()
		};
	}
}

/// <summary>
/// Custom placeholders including current user/employee.
/// </summary>
public class CurrentUserPlaceholders : PlaceholderEnvironment<CurrentUserContext>
{
	protected override CommandProviders GetCommandProviders( CurrentUserContext context )
	{
		// Get default command providers.
		CommandProviders providers = base.GetCommandProviders( context );

		// Add placeholders for application information.
		providers.AddRange(
			new StaticContextPlaceholderProvider( "CURRENTUSER", "CurrentUser", 
					new UserAccountContext( context?.CurrentUserId ) ),
			new StaticContextPlaceholderProvider( "CURRENTEMPLOYEE", "CurrentEmployee", 
					new ObjectContext { context?.CurrentEmployee } ) );

		return providers;
	}
}

[DataContract]
public class Configuration
{
	/// <summary>
	/// Reference to the employee object type that holds additional information about vault users.
	/// </summary>
	[DataMember]
	[MFObjType]
	public MFIdentifier EmployeeObjType { get; set; }

	/// <summary>
	/// Reference to the property def that holds the associated vault user on UserObjType objects.
	/// </summary>
	[DataMember]
	[MFPropertyDef]
	public MFIdentifier UserPropDef { get; set; }

	/// <summary>
	/// Placeholder template with my custom settings and placeholders.
	/// </summary>
	[DataMember]
	public PlaceholderTextEx<CurrentUserPlaceholders, CurrentUserContext> Template { get; set; }
}

// The new expansion calls no longer need to be aware of the correct settings or placeholders
// they are already defined in the Template's type and will be used automatically.
var context = TemplateContextWithCurrentUser.Create( env, conf.EmployeeObjType, conf.UserPropDef );
string text =  conf.Template.ExpandText( context );
ExpandedPlaceholderTemplate expTemplate = conf.Template.Expand( context );
```

Please note that though the value that a custom placeholder resolves to may vary between executions, the actual list of placeholders returned from the `GetCommandProviders()` must remain stable.  `GetCommandProviders()` must also be able to cope with a null context, and most missing/null properties within the context.  To generate the client definitions, `GetCommandProviders()` is always called with a null context.  For unit testing, being able to omit vault and target object properties can be very useful.  All placeholder commands must be able to handle null contexts, and we'll get to that in the next section.

### 3. Custom Formatting

As of VAF 23.10.699.0 placeholder value formatting can be controlled by code via the placeholder settings provided by the environment or by the placeholder template definers themselves if the newly built-in FormatterPlaceholder is available.

The new Format placeholder command can control the value formats but not culture.  It takes a .NET format string as a parameter. These are a bit clunky from the UI as they get set via the reference tab.  These override any formats specified in the settings. Underscores must be used instead of spaces, as spaces are not legal characters in placeholder command parameters.  Underscore literals can be specified by escaping the underscore with a backslash.

#### .NET Format String References

- [Standard numeric format specifiers](https://learn.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings#standard-format-specifiers)
- [Custom numeric format strings](https://learn.microsoft.com/en-us/dotnet/standard/base-types/custom-numeric-format-strings)
- [Date formats](https://learn.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings#date-formats)
- [Date and time formats](https://learn.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings)
- [Custom date and time format strings](https://learn.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings)

#### 3.1 Custom Formatting Example

```csharp
/// <summary>
/// A custom placholder template context allowing custom culture
/// and formats to be passed in at expansion time.
/// </summary>
public class FormattableContext : TemplateContext
{
	public PlaceholderFormatter Formatter { get; set; }
}

/// <summary>
/// Placeholder environment with an additional FORMAT command,
/// that also allows custom culture and date formatting to be specified.
/// </summary>
public class FormattableEnv : PlaceholderEnvironment<FormattableContext>
{
	public override PlaceholderTemplateSettings GetSettings( FormattableContext context )
	{
		// Update settings with the culture from the context.
		PlaceholderTemplateSettings settings = base.GetSettings( context );
		if( context?.Formatter != null )
			settings.Formatter = context.Formatter;
		return settings;
	}

	protected override CommandProviders GetCommandProviders( FormattableContext context )
	{
		// Get default providers.
		CommandProviders providers = base.GetCommandProviders( context );

		// Include FORMAT command provider.
		providers.Add( new PlaceholderCommandProvider<FormatPlaceholder>( "FORMAT", "Format" ) );

		return providers;
	}
}


/// <summary>
/// Configuration that allows specifying a placeholder template and
/// the culture and date format to use when expanded.
/// </summary>
[DataContract]
public class Configuration
{
	[DataMember]
	[JsonConfEditor( HelpText = "The culture to use when expanding the template (and formating values). " +
			"Try things like 'EN-US', 'EN-GB' or 'FI-FI'.  If empty the default server culture will be used." )]
	public string Culture { get; set; }

	[DataMember]
	public string TimestampFormat { get; set; }

	[DataMember]
	public PlaceholderTextEx Template { get; set; }

	public string ExpandPlaceholderTemplate( ObjVerEx objVerEx )
	{
		// Create context.
		var context = new FormattableContext()
		{
			Vault = vault,
			Target = ObjVerEx.Latest( vault, this.Object.ObjID ),
			Formatter = new PlaceholderFormatter()
		};

		// Set the custom culture if provided.
		if( !string.IsNullOrEmpty( this.Culture ) )
			context.Formatter.Culture = CultureInfo.CreateSpecificCulture( this.Culture );

		// Set the custom date format if provided.
		if( !string.IsNullOrWhiteSpace( this.TimestampFormat ) )
			context.Formatter.TimestampFormat = this.TimestampFormat;

		// Expand.
		return this.Template.ExpandText( context );
	}
}

// Call configuration expansion method with following values:
// Culture: "DE-de"
// TimestampFormat: "D"
// Template: "Modified: %PROPERTY_21%, Value: %PROPERTY_{PD.Value}.FORMAT_{C}%"
conf.ExpandPlaceholderTemplate( objVerEx ); 
// -> "Modified: Dienstag, 12. M?rz 2024, Value: 600,00 ?"

// Override TimestampFormat defined in configuration/settings with FORMAT command. 
// (Underscores are used for spaces, literal underscores must be escaped with backslash.)
// Template: "Modified: %PROPERTY_21.FORMAT_{ddd,_dd\_MMM\_yy}%, Value: %PROPERTY_{PD.Value}.FORMAT_{C}%"
conf.ExpandPlaceholderTemplate( objVerEx ); 
// -> "Modified: : Di, 12_Mrz_24, Value: 600,00 ?"

```

### 4. Custom Placeholder Commands

So far, the examples have only shown how to replace placeholders with static values either hard coded or passed in during expansion.  The following examples show how to build custom placeholder commands that transform the context that they receive.

#### 4.1 Average Placeholder Command

At its most basic, a placeholder command must declare its input types, output type and command type, and implement the `Expand()` method to make the transformation.  The `Expand()` method returns an `ExpandedLevel` object which consists of a referenece to the level (command within a placeholder, within a template), the output and any issues encountered. The `ExpandedLevel`s can be traversed via `ExpandedPlaceholderTemplate`.

```csharp
/// <summary>
/// Custom placeholder command that calculates the average of the values it receives.
/// </summary>
public class AveragePlaceholder : PlaceholderCommandHandler
{
	/// <summary>
	/// The expansion context types the command can take as input.
	/// </summary>
	/// <remarks>
	/// Works on either float or integer contexts.
	/// </remarks>
	public override ExpansionContextType[] AcceptsContextTypes =>
			new ExpansionContextType[] { ExpansionContextType.Float, ExpansionContextType.Integer };

	/// <summary>
	/// The expansion context type the command emits.
	/// </summary>
	/// <remarks>
	/// Always outputs float context.
	/// </remarks>
	public override ExpansionContextType ContextType => ExpansionContextType.Float;

	/// <summary>
	/// The type of command this is.
	/// </summary>
	/// <remarks>
	/// Simple command only. No arguments allowed!
	/// </remarks>
	protected override PlaceholderLevelType[] SupportedTypes =>
			new PlaceholderLevelType[] { PlaceholderLevelType.Simple };

	/// <summary>
	/// Expands the placeholder level based on the input context.
	/// </summary>
	/// <remarks>
	/// Calculates the average of the values in the input context.
	/// </remarks>
	/// <param name="input">The expansion context.</param>
	/// <param name="cache">The object cache.</param>
	/// <returns><see cref="ExpandedLevel"/></returns>
	public override ExpandedLevel Expand(
		IExpansionContext input,
		ObjVerExReadCache cache
	)
	{
		// Calculate average base on input type.
		var output = new FloatContext();
		List<PlaceholderExpansionIssue> issues = null;
		if( input is FloatContext floatInput && input.Count > 0)
		{
			// Average floats.
			output.Add( floatInput.SafeCast<double>().Average() );
		}
		else if( input is IntegerContext intInput && input.Count > 0)
		{
			// Average integers.
			output.Add( intInput.SafeCast<int>().Average() );
		}

		// Return an exanded level holding the output and/or issues.
		return new ExpandedLevel( this.Level, input, output, null, issues );
	}
}

/// <summary>
/// Custom template context that takes a list of review values given.
/// <summary>
public class ReviewContext : TemplateContext
{
	/// <summary>
	/// List of review values.
	/// <summary>
	/// <remarks>
	/// This is used to provide a set of integer values that we can
	/// use our custom AveragePlaceholder with clearly in  the example code.
	/// The set of values could just as easily come from a property value
	/// on a set of objects.
	/// <remarks>
	public IntegerContext StarReviews { get; set; }
}

/// <summary>
/// Custom placeholder environment that takes requires the ReviewContext for expansion
/// and that exposes the built-in CountPlaceholder as the COUNT command,
/// our newly created AveragePlaceholder as the AVG command,
/// and the static StarReviews value passed in the ReviewContext as the STARS command.
/// <summary>
public class ReviewPlaceholders : PlaceholderEnvironment<ReviewContext>
{
	protected override CommandProviders GetCommandProviders( ReviewContext context )
	{
		return new CommandProviders
		{
			new PlaceholderCommandProvider<AveragePlaceholder>( "AVG", "Avg" ),
			new PlaceholderCommandProvider<CountPlaceholder>( "COUNT", "Count" ),
			new StaticContextPlaceholderProvider( "STARS", "Stars", context.StarReviews )
		};
	}
}

[DataContract]
public class Configuration
{
	/// <summary>
	/// Placeholder property whose type plainly reveals it is intended to be used
	/// with our custom ReviewPlaceholders environment and custom ReviewContext.
	/// <summary>
	[DataMember]
	public PlaceholderTextEx<ReviewPlaceholders, ReviewContext> Template { get; set; }
}

// Usage.
var conf = new Configuration { Template = "%STARS.AVG% Stars / %STARS.COUNT% Reviews" };
var context = new ReviewContext { StarReviews = new IntegerContext { 4, 3, 5, 1, 4, 2, 4, 5 } };
string reviewSummary = conf.Template.ExpandText( context );  // OUTPUTS: "3.5 Stars / 8 Reviews"

```

#### 4.2 Self Command

Sometimes placeholder texts are used for gathering references to related objects rather than simple template formatting.  When this is done, it can be useful to allow a placeholder to specifically reference the context object itself. Compliance Kit has introduced the notion of a `{Self()}` placeholder for this purpose.

**NOTE:** The `{Self()}` placeholder should not ever be required in normal text templating.  Using it by itself would automatically convert the object to a string (its title) which can already be done using the `{ObjTitle()}` placeholder.  Trying to use it for chaining (to access its properties, for instance) is also redundant as the chained placeholders would already automatically receive the ambient context if omitted.

The easiest way to implement the SELF placeholder would be to use the `StaticContextPlaceholderProvider, however this requires that the template is re-parsed and the environment recreated for every expansion with a different context, which can be expensive in certain scenarios. To avoid this, that it is best to implement it as a custom placeholder command that dynamically returns whatever object context it is passed.  Using the StaticContextPlacheolderProvider would also make it more difficult for us to disable chaining in the client, which as noted above, would always be redundant.

```csharp
/// <summary>
/// Placeholder command that outputs the ambient context if it is an object,
/// otherwise an empty object context.
/// </summary>
public class SelfPlaceholder : PlaceholderCommandHandler
{
	/// <summary>
	/// The expansion context types the command can take as input.
	/// </summary>
	public override ExpansionContextType[] AcceptsContextTypes => new [] { ExpansionContextType.None };

	/// <summary>
	/// The expansion context type the command emits.
	/// </summary>
	public override ExpansionContextType ContextType => ExpansionContextType.Object;

	/// <summary>
	/// The type of command this is.
	/// </summary>
	protected override PlaceholderLevelType[] SupportedTypes => new [] { PlaceholderLevelType.Simple };

	/// <summary>
	/// Expands the placeholder level based on the input context.
	/// </summary>
	/// <param name="input">The expansion context.</param>
	/// <param name="cache">The object cache.</param>
	/// <returns><see cref="ExpandedLevel"/></returns>
	public override ExpandedLevel Expand(
		IExpansionContext input,
		ObjVerExReadCache cache
	)
	{
		// We can only receive the abmient context because our input type is none.
		// If the ambient context is an object, return it as the output, otherwise
		// return an empty object context as there is no "self" to return.
		IExpansionContext output = ( input.Clone() as ObjectContext )?.Clone() ?? new ObjectContext();
			
		// Return an exanded level holding the output and/or issues.
		return new ExpandedLevel( this.Level, input, output, null, null );
	}

	/// <summary>
	/// Gets the client definitions for this handler.
	/// </summary>
	/// <param name="commandName">The command name.</param>
	/// <param name="displayName">The display name.</param>
	/// <returns>Client command definitions.</returns>
	public override IEnumerable<ClientPlaceholderCommand> GetClientDefinitions(
		string commandName,
		string displayName
	)
	{
		// Generate definitions as normal, then augment each before returning.
		foreach( ClientPlaceholderCommand cmd in base.GetClientDefinitions( commandName, displayName ) )
		{
			// Make the command unchainable and return.
			cmd.Chainable = false;
			yield return cmd;
		}
	}
}

/// <summary>
/// Placeholder environment for defining/resolving object references from a target object.
/// </summary>
public class ObjectRefsEnv: PlaceholderEnvironment
{
	protected override CommandProviders GetCommandProviders( TemplateContext context )
	{
		// Only provide commands that can yield object references,
		// or can be chained to commands that yield object references.
		return new CommandProviders
		{
			new PlaceholderCommandProvider<PropertyPlaceholder>( "PROPERTY", "Property" ),
			new PlaceholderCommandProvider<ObjTypePlaceholder>( "OBJTYPE", "ObjType" ),
			new PlaceholderCommandProvider<SelfPlaceholder>( "SELF", "Self" ),
			new PlaceholderCommandProvider<ParentPlaceholder>( "PARENT", "Parent" ),
		};
	}
}

[DataContract]
public class Configuration
{
	[DataMember]
	public PlaceholderTextEx<ObjectRefsEnv> Template { get; set; }
}


// USAGE: Resolve references of a single object.
var objRefs = this.Template.Expand( objVerEx ).GetExpandedValues<ObjVerEx>().ToHashSet();

// USAGE: Resolve refererences of many objects efficiently.
// - We parse the template only once using a null context, as nothing special is needed.
// - Use a common cache so objects are only ever loaded once even if referenced by multiple objects.
PlaceholderTemplate parsedTemplate = this.Template.CreateTemplate( null );
var cache = new ObjVerExReadCache( vault );
foreach( ObjVerEx objVerEx in targets ) {
	var objRefs = parsedTemplate.Expand( objVerEx ).GetExpandedValues<ObjVerEx>().ToHashSet();
	// ...do something with refs.
}

```

### 5. Custom Client Placeholder Definition

To modify the client definitions generated by placeholder commands and/or their providers, you can override `GetClientDefinitions()` in a derived  `PlaceholderCommandHandler`, or you can alter the already output definitions by overriding `GetClientCommandDefinitions()` in a derived `PlaceholderEnvironment`.

The default/built-in client definition generation seems to be working OK for simple commands, but you will typically have to override it and make at least one or two adjustments for complex placeholders (those that take arguments), so you can inform the client whether the argument references some structure item that can be proposed as an option, or is just a custom string users can freely provide.

For a single PlaceholderCommandHandler that implements both simple and complex command types, typically 2 defintiions will be generated. One for the simple command, and one for the complex.  It is not recommended to do this, but it is required to match legacy/built-in behavior for some placeholder commands, and therefore affects the interface design.

### 5.1 Client Definition Controlled by Command

Inside a class that extends `PlaceholderCommandHandler`...

```csharp
/// <summary>
/// Gets the client definitions for this handler.
/// </summary>
/// <param name="commandName">The command name.</param>
/// <param name="displayName">The display name.</param>
/// <returns>Client command definitions.</returns>
public override IEnumerable<ClientPlaceholderCommand> GetClientDefinitions(
	string commandName,
	string displayName
)
{
	// Generate definitions as normal, then augment each before returning.
	foreach( ClientPlaceholderCommand cmd in base.GetClientDefinitions( commandName, displayName ) )
	{
		// Include the user string constructor, so the editor knows to allow
		// generating options with a custom user string from the reference panel.
		cmd.OptionConstructor = ClientPlaceholderOptionConstructor.UserString;
		yield return cmd;
	}
}
```

### 5.1 Client Definition Controlled by Environment

Inside a class that extends `PlaceholderEnvironment`...

```csharp

/// <summary>
/// Gets the client command definitions matching the environment's available placeholders command handlers.
/// These are used by MFAdmin's placeholder tempate editor, so it can suggest the correct placeholders
/// in the correct places and do some basic client-side validation.
/// </summary>
/// <param name="context">The context of the request.</param>
/// <returns>The client command definitions available in this environment.</returns>
public virtual IEnumerable<ClientPlaceholderCommand> GetClientCommandDefinitions(
	IConfigurationRequestContext context
)
{
	// Prevent all commands from being chainable.
	foreach( ClientPlaceholderCommand cmd in base.GetClientCommandDefinitions( context ) ) {
	
		// Make the command unchainable and return.
		cmd.Chainable = false;
		yield return def;
	}
}
```
