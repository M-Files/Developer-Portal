# Generated and hand-maintained content in the REST API reference

Most of this folder is **maintained by hand**: the resource pages (`resources/**/index.md`), the struct and enum pages (`structs/`, `enumerations/`) and the other topic pages. Edit them directly. They were generated from the MFWS documentation project long ago, but that project's sources no longer cover everything the portal documents (for example AutomaticMetadataRequestInfo and ServerVaultCapabilities). Keep the existing page shapes; see `CLAUDE.md` at the repository root.

The exceptions below are **generated** by the MFWS documentation project in the classic web repository (GitLab `m-files/m-files-web`, folder `MFWS Documentation/`). Change the sources there and regenerate. Hand edits are lost, and the generated copies would disagree with the sources.

| Generated file here | Source in `m-files-web/MFWS Documentation/` |
|---|---|
| `MFWS_Samples.zip`: C# and Java utilities (`MFWSStructs.cs`, `MFWSStructs (No DataContracts).cs`, `MFWSClient.cs`, `MFWSClient.java`, `MFWSEnumerations.js`) | Structs and enums in `Documentation/spec_structs.tex` and `Documentation/spec_enums.tex`, rendered with `MFiles.Documentation.Writer/Templates/Code/*.cscode` |
| `MFWS_Samples.zip`: samples (`CSharp/Samples/*.cs`, `JavaScript/Samples/*.js`) | `MFiles.MFWS.Sample/` (`ResourceSamples.cs`, `*Sample.cs`, `Samples.js`) |
| `MFWS_Samples.zip`: `MFWS Documentation.pdf` | The LaTeX sources in `Documentation/*.tex` |
| Code snippets in `**/samples/**/*.md`, such as `resources/files/samples/createobject/cs.md` and `gettingstarted/samples/creation/cs.md` | Copies of the samples in `MFiles.MFWS.Sample/` (for example `ResourceSamples.cs` has CreateObject, GetObjectVersion, DownloadFile and the view hierarchy samples). Update the sample there, then copy it here. |

The `Runner` project in that folder builds everything; its output is in `Output/Web` (including `MFWS_Samples.zip`), `Output/Code` and `Output/Samples`.

This file starts with `_`, so Jekyll does not publish it.
