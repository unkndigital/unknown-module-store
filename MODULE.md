# Unknown Store

Optional app and module catalog for Unknown Core 0.7.0 or newer. This is an independent,
owner-installed project, not the LG Content Store or webOS Homebrew Channel.

Install the Store ZIP through Core, then enable it. The Store section appears in
Core. The **Install Unknown Store** shortcut on Core's Install page opens the same
module review using a bundled ZIP, so private GitHub authentication is not needed.

Select a project to fetch its latest stable GitHub release. Select an IPK to
download and inspect it, then review its identity, version, architecture, scripts,
services, origin and checksum before selecting Install. No third-party app is
automatically installed, updated or launched. GitHub hosts downloads directly;
there is no Unknown account, proxy, telemetry or remote executable catalog.

The starter catalog links Jellyfin, Moonlight, IHSplay and RetroArch upstream
projects. Inclusion is not certification, an affiliation, or a security review.
GitHub can change assets and repositories; a matching checksum is not a signature
or a promise of safety. Compatibility is conservative and not guaranteed.

The **Modules** tab lists separately packaged Unknown Suite modules. **Owner Dev
Mode** opens the Local Access module in Core: account-free root SSH/SFTP and key
pairing, not a second SSH manager. The older standalone app's jailed prisoner SSH
mode is not included. Application retention is a separate Continuity module.
Installed entries offer Manage module. Store never removes or overwrites an
installed module automatically, and downloaded modules stay disabled until the
owner explicitly chooses activation.

**Official** identifies the exact Unknown Digital repository registered for that
module ID in Core. It is not an LG endorsement or a safety guarantee. A module
cannot award itself this badge. Community entries use the same schema and review
flow but receive no Official badge; no third-party module has been added yet.

The catalog is data in catalog.json, reviewed with this module release. New
entries need a public upstream repository, expected app ID, clear compatibility
notes and an IPK release asset. Core checks that the selected package matches the
catalog app ID. Do not add copyrighted app copies, firmware or rooting packages.

Schema 2 adds a `modules` array alongside `apps`. Each module entry contains `id`,
`title`, `category`, `repository`, `description`, `compatibility`, and optional
`icon` (play, monitor-up, layout-grid, or package-open). Repository links must be
public HTTPS GitHub repository URLs with an installable ZIP in Releases. Core
checks the downloaded manifest ID before importing the ZIP. Do not add an
`official` field: Core derives it from its own exact repository allowlist.

Disabling Store hides the catalog. It does not uninstall apps installed through
it, revert their effects or make those apps part of Core's module recovery.
Follow docs/wiki/GitHub-IPKs.md in the Core source for installer limitations.

Use only on your own TV. Keep recovery access and backups. Third-party IPKs can
execute code and installation scripts; review their source, license and origin.
No changes to LG authentication, agreement acceptance or firmware are included.

Copyright (c) 2026 Unknown Digital and Unknown Suite contributors. MIT licensed.
