package com.winjune.wips.manager.common.util;

import com.winjune.wips.manager.common.struts.EntityField;

public interface EntitySearchMap {
    /**
     * @return DataCollection<fieldName, isString>
     */
    public DataCollection<String, EntityField> getFields();
}
