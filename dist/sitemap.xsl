<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
				<title>XML Sitemap - CMoviez</title>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
				<style type="text/css">
					body {
						font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
						color: #333;
						margin: 0;
						padding: 40px;
						background: #0f172a;
						color: #f1f5f9;
					}
					.container {
						max-width: 1000px;
						margin: 0 auto;
					}
					h1 { 
						margin-bottom: 5px; 
						color: #e50914; 
						font-weight: 800;
						letter-spacing: -1px;
					}
					p { color: #94a3b8; margin-top: 0; margin-bottom: 30px; font-size: 0.9rem; }
					table {
						width: 100%;
						border-collapse: collapse;
						background: #1e293b;
						border-radius: 12px;
						overflow: hidden;
						box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.5);
					}
					th {
						background: #334155;
						padding: 15px 20px;
						text-align: left;
						font-weight: 600;
						color: #e2e8f0;
						border-bottom: 2px solid #475569;
						text-transform: uppercase;
						font-size: 0.75rem;
						letter-spacing: 0.05em;
					}
					td {
						padding: 12px 20px;
						border-bottom: 1px solid #334155;
						font-size: 14px;
					}
					tr:last-child td { border-bottom: none; }
					tr:hover td { background: #334155; }
					a { color: #38bdf8; text-decoration: none; }
					a:hover { text-decoration: underline; }
					.lastmod { color: #94a3b8; font-family: monospace; }
					.priority {
						display: inline-block;
						padding: 2px 8px;
						border-radius: 4px;
						background: rgba(56, 189, 248, 0.1);
						color: #38bdf8;
						font-weight: 600;
						font-size: 0.75rem;
					}
				</style>
			</head>
			<body>
				<div class="container">
					<h1>CMoviez XML Sitemap</h1>
					<p>This sitemap is generated automatically to help Google index your movies with Sinhala Subtitles.</p>
					<table>
						<thead>
							<tr>
								<th>URL</th>
								<th>Last Modified</th>
								<th>Change Freq</th>
								<th>Priority</th>
							</tr>
						</thead>
						<tbody>
							<xsl:choose>
								<xsl:when test="sitemap:sitemapindex">
									<xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
										<tr>
											<td>
												<xsl:variable name="itemURL">
													<xsl:value-of select="sitemap:loc"/>
												</xsl:variable>
												<a href="{$itemURL}">
													<xsl:value-of select="sitemap:loc"/>
												</a>
											</td>
											<td class="lastmod">
												<xsl:value-of select="sitemap:lastmod"/>
											</td>
											<td colspan="2" style="text-align: center; color: #64748b;">(Sub-sitemap)</td>
										</tr>
									</xsl:for-each>
								</xsl:when>
								<xsl:otherwise>
									<xsl:for-each select="sitemap:urlset/sitemap:url">
										<xsl:sort select="sitemap:priority" order="descending"/>
										<tr>
											<td>
												<xsl:variable name="itemURL">
													<xsl:value-of select="sitemap:loc"/>
												</xsl:variable>
												<a href="{$itemURL}">
													<xsl:value-of select="sitemap:loc"/>
												</a>
											</td>
											<td class="lastmod">
												<xsl:value-of select="sitemap:lastmod"/>
											</td>
											<td>
												<xsl:value-of select="sitemap:changefreq"/>
											</td>
											<td>
												<span class="priority">
													<xsl:value-of select="sitemap:priority"/>
												</span>
											</td>
										</tr>
									</xsl:for-each>
								</xsl:otherwise>
							</xsl:choose>
						</tbody>
					</table>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
