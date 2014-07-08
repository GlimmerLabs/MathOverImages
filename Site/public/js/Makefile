# public/js/Makefile
#   Some basic actions for the Javascript pages.  Mostly used to
#   join files together.

MIST_FILES = \
        mist-header.js \
        mist-functions.js \
        mist-functions-builtin.js \
        mist-layout.js \
        mist-functions-layout.js \
        mist-render.js \
        mist-utils.js

MIST_GUI_FILES = \
        mist-gui-header.js \
        mist-gui-EditableText.js \
        mist-gui-changingWorkspace.js \
        mist-gui-constructors.js \
        mist-gui-dragLayerEvents.js \
        mist-gui-funBarEvents.js \
        mist-gui-globalVariables.js \
        mist-gui-initializeStage.js \
        mist-gui-lineLayerEvents.js \
        mist-gui-makeFunctionBar.js \
        mist-gui-makeLabels.js \
        mist-gui-makeMenu.js \
        mist-gui-makeToolbox.js \
        mist-gui-menuEvents.js \
        mist-gui-menuTweens.js \
        mist-gui-openWorkspaceScreen.js \
        mist-gui-predicates.js \
        mist-gui-saveScreen.js \
        mist-gui-saveWorkspaceScreen.js \
        mist-gui-toolboxEvents.js \
        mist-gui-utilityFunctions.js \
        mist-gui-workLayerEvents.js \
        mist-gui-workspaceFunctions.js 

MISTUI_FILES = \
        mistui-header.js \
        mistui-animation.js \
        mistui-animator.js \
        mistui-dialogs.js \
        mistui-help.js \
        mistui-menus.js

default: mist.js mistui.js mistgui.js \
        ugly.mist.js ugly.mistui.js ugly.mistgui.js

mist.js: $(MIST_FILES)
	cat $^ > $@

mistui.js: $(MISTUI_FILES)
	cat $^ > $@

mistgui.js: $(MIST_GUI_FILES)
	cat $^ > $@

ugly.%: %
	uglifyjs $^ > $@
