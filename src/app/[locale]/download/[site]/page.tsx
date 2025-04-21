"use client"

import { getAllSites } from "@/services/GetAllSitesService";
import { Site } from "@/types/Site";
import { hashSha256WithSalt } from "@/util/Util";
import { redirect, useParams } from "next/navigation";
import { useEffect } from "react";
import { useTranslations } from "use-intl";

export default function DownloadPage() {
  const params = useParams();
  const encryptedSiteId = params?.site;

  let site: Site | null

  let sites: Site[] = []

  useEffect(() => {

    function openAppOrStore(site: Site) {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isAndroid = userAgent.indexOf("android") > -1;
      const isIOS = /iphone|ipad|ipod/.test(userAgent);
    
      const schemeUrl = `intent://${site.bundle_id}/${site.site_id}/#Intent;scheme=${site.scheme_id};package=${site.bundle_id};end;`;
      const iosAppStoreUrl = `https://apps.apple.com/app/id${site.appstore_id}`;
      const androidPlayStoreUrl = `https://play.google.com/store/apps/details?id=${site.bundle_id}`;
    
      const now = Date.now();
    
      window.location.href = schemeUrl;
    
      setTimeout(() => {
        if (Date.now() - now < 2000) {
          if (isIOS) {
            window.location.href = iosAppStoreUrl;
          } else if (isAndroid) {
            window.location.href = androidPlayStoreUrl;
          } else {
            // Other
            window.location.href = androidPlayStoreUrl;
          }
        }
      }, 1500);
    }    

    const resolve = async () => {
      sites = await getAllSites()

      for (const s of sites) {
        const hashed =  hashSha256WithSalt(s.site_id);
        if (hashed === encryptedSiteId) {
          site = s
          break;
        }
      }

      if (!site) {
        return
      }

      openAppOrStore(site)
    }

    resolve()
  })

  const t = useTranslations()
  return (
    <>
      {t('redirecting')}
    </>
  );
}
