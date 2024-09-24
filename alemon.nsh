!macro customRemoveFiles
    ${if} ${isUpdated}
        RMDir /r "$TEMP\Alemon-temp"
        CreateDirectory "$TEMP\Alemon-temp"
        SetOutPath "$TEMP\Alemon-temp"
        CopyFiles /SILENT "$INSTDIR\resources\package.json" "$TEMP\Alemon-temp"
        CopyFiles /SILENT "$INSTDIR\resources\root\*" "$TEMP\Alemon-temp\root"
        CopyFiles /SILENT "$INSTDIR\resources\node_modules\*" "$TEMP\Alemon-temp\node_modules"
    ${endif}

    RMDir /r $INSTDIR
!macroend