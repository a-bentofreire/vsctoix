# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.1.0]
### Changed
- Update Changelog to conform with the standards.
- (DEV) Move code shared with atomtoix to common folder.
- (DEV) Move the list of the utilities to `common/utility-list`.
> This change improves compatibility with atomtoix code.  
- Change the utility list output format to tabular in `README.md`.

### Added
- (DEV) Add support for multiple inputbox in `utilitymanager`.
 > This addition allows for tools to request multiple inputs from the user
- Add utility: `mixer`.
- Add utility: `dashCase`.

### Fixed
- (DEV) Fix lint issues.


## [1.0.2] - 2018-08-22
### Added
- Add utility: `headerToBookmark`.

## [0.2.2] - 2018-03-13
### Added
- Add to Expressions the functions: length, regnize and isotimedate.
- Add utilities: `IsoTimeDate`, `Regnize`, `indentOneSpace`, `outdentOneSpace`.

### Fixed
- Fix IsoDate timezone issue.

### Changed
- Change License to MIT+uuid https://github.com/a-bentofreire/uuid-licenses/blob/master/MIT-uuid-license.md
- Simplified the License lines on the source code.
- Change Author e-mail.


## [0.1.0] - 2018-02-09
- Initial release.